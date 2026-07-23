const {
  sequelize,
  user: userModel,
  status: statusModel,
  voting_period: votingPeriodModel,
  director_candidate: directorCandidateModel,
  director_vote: directorVoteModel,
  commissioner_candidate: commissionerCandidateModel,
  commissioner_vote: commissionerVoteModel,
  company: companyModel,
} = require("../models/index.js");
const { Op, Sequelize, fn, col } = require("sequelize");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const CustomHttpError = require("../utils/custom_http_error.js");
const { createLogHandler } = require("./write_log.controller.js");
const dayjs = require("dayjs");

const getDataTable = async (req, res) => {
  const {
    search,
    is_active,
    sort,
    status_user,
    status_vote,
    company,
    is_member,
    voting_period_uuid,
  } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  let order = [["name", "ASC"]];

  if (sort) {
    const direction = sort.startsWith("-") ? "DESC" : "ASC";
    const column = sort.replace("-", "");
    order = [[column, direction]];
  }

  const where = {};

  if (search) {
    where[Op.or] = [
      {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
      {
        membership_number: {
          [Op.like]: `%${search}%`,
        },
      },
    ];
  }

  where.is_active = is_active !== undefined ? Number(is_active) === 1 : true;

  where.is_member = is_member !== undefined ? Number(is_member) === 1 : true;

  if (company) {
    const companyData = await companyModel.findOne({
      where: { uuid: company },
    });

    if (!companyData) {
      throw new CustomHttpError("Company not found", 404);
    }

    where.company_id = companyData.id;
  }

  if (status_user) {
    const statusData = await statusModel.findOne({
      where: { uuid: status_user },
    });

    if (!statusData) {
      throw new CustomHttpError("Status not found", 404);
    }

    where.status_id = statusData.id;
  } else {
    const statusData = await statusModel.findOne({
      where: {
        code: 2,
      },
    });

    where.status_id = statusData.id;
  }

  if (!voting_period_uuid) {
    throw new CustomHttpError("Voting period not set", 400);
  }

  const votingPeriod = await votingPeriodModel.findOne({
    where: {
      uuid: voting_period_uuid,
    },
  });

  if (!votingPeriod) {
    throw new CustomHttpError("Voting period not found", 404);
  }

  const whereVote = {
    voting_period_id: votingPeriod.id,
    is_validate: 1,
  };

  /**
   * status_vote
   * 1 = sudah voting
   * 0 = belum voting
   */
  if (status_vote !== undefined) {
    if (Number(status_vote) === 1) {
      where[Op.and] = [
        Sequelize.literal(`
          EXISTS (
            SELECT 1
            FROM director_votes dv
            WHERE
              dv.user_id = user.id
              AND dv.voting_period_id = ${votingPeriod.id}
              AND dv.is_validate = 1
          )
        `),
        Sequelize.literal(`
          EXISTS (
            SELECT 1
            FROM commissioner_votes cv
            WHERE
              cv.user_id = user.id
              AND cv.voting_period_id = ${votingPeriod.id}
              AND cv.is_validate = 1
          )
        `),
      ];
    }

    if (Number(status_vote) === 0) {
      where[Op.and] = [
        Sequelize.literal(`
          NOT EXISTS (
            SELECT 1
            FROM director_votes dv
            WHERE
              dv.user_id = user.id
              AND dv.voting_period_id = ${votingPeriod.id}
              AND dv.is_validate = 1
          )
          OR
          NOT EXISTS (
            SELECT 1
            FROM commissioner_votes cv
            WHERE
              cv.user_id = user.id
              AND cv.voting_period_id = ${votingPeriod.id}
              AND cv.is_validate = 1
          )
        `),
      ];
    }
  }

  const { count, rows } = await userModel.findAndCountAll({
    where,
    include: [
      {
        model: companyModel,
        attributes: ["uuid", "name"],
      },
      {
        model: directorVoteModel,
        required: false,
        where: whereVote,
      },
      {
        model: commissionerVoteModel,
        required: false,
        where: whereVote,
      },
    ],
    order,
    limit,
    offset,
    distinct: true,
  });

  const data = rows.map((item) => ({
    uuid: item.uuid,
    membership_number: item.membership_number,
    name: item.name,
    is_verified: item.is_verified,
    is_member: item.is_member,

    company: {
      uuid: item.company.uuid,
      name: item.company.name,
    },

    director_vote_date: item.director_votes,
    commissioner_vote_date: item.commissioner_votes,

    status_vote:
      item.director_votes.length > 0 && item.commissioner_votes.length > 0
        ? 1
        : 0,
  }));

  return res.status(200).json({
    success: true,
    message: "success",
    data,
    meta: {
      total: count,
      page,
      limit,
      pages: Math.ceil(count / limit),
    },
  });
};

const getReportTable = async (req, res) => {
  const { voting_period_uuid } = req.query;

  let voting_period_id = null;

  if (voting_period_uuid) {
    const votingPerion = await votingPeriodModel.findOne({
      where: {
        uuid: voting_period_uuid,
      },
    });

    if (votingPerion) {
      voting_period_id = votingPerion.id;
    } else {
      throw new CustomHttpError("voting periode not found", 404);
    }
  } else {
    return res.status(200).json({
      success: true,
      message: "success",
      data: { total_anggota: 0 },
    });
  }

  const user_all = await userModel.count({
    where: {
      is_active: true,
      is_member: true,
    },
  });

  const voted_users = await userModel.count({
    where: {
      is_active: true,
      is_member: true,
    },
    include: [
      {
        model: directorVoteModel,
        where: {
          voting_period_id: voting_period_id,
          is_validate: 1,
        },
      },
      {
        model: commissionerVoteModel,
        where: {
          voting_period_id: voting_period_id,
          is_validate: 1,
        },
      },
    ],
  });

  const pending_users = user_all - voted_users;

  const user_is_verified = await userModel.count({
    where: { is_active: true, is_verified: true, is_member: true },
  });

  const voted_users_persent =
    user_all === 0 ? 0 : Number(((voted_users / user_all) * 100).toFixed(2));

  const pending_users_persent =
    user_all === 0 ? 0 : Number(((pending_users / user_all) * 100).toFixed(2));

  const user_is_verified_persent =
    user_all === 0
      ? 0
      : Number(((user_is_verified / user_all) * 100).toFixed(2));

  return res.status(200).json({
    success: true,
    message: "success",
    data: {
      user_all: { total: user_all, persent: Number(100) },
      voted_users: { total: voted_users, persent: voted_users_persent },
      pending_users: { total: pending_users, persent: pending_users_persent },
      user_is_verified: {
        total: user_is_verified,
        persent: user_is_verified_persent,
      },
    },
  });
};

const getDataTableAttribute = async (req, res) => {
  const company = await companyModel.findAll({
    where: {
      is_active: true,
    },
  });

  const status_voting = [
    { name: "Belum Voting", value: 0 },
    { name: "Sudah Voting", value: 1 },
  ];

  return res.status(200).json({
    success: true,
    message: "success",
    data: { company, status_voting },
  });
};

const getReportDashboard = async (req, res) => {
  const { voting_period_uuid } = req.query;
  const user_all = await userModel.count({
    where: {
      is_active: 1,
      is_member: 1,
    },
  });

  const user_verified = await userModel.count({
    where: {
      is_active: 1,
      is_verified: 1,
      is_member: 1,
    },
  });

  const user_unverified = Number(user_all - user_verified);
  const user_verified_persent =
    user_verified === 0
      ? 0
      : Number(((user_verified / user_all) * 100).toFixed(2));
  const user_unverified_persent =
    user_unverified === 0
      ? 0
      : Number(((user_unverified / user_all) * 100).toFixed(2));

  //voting activity overview

  const votingPeriod = await votingPeriodModel.findOne({
    where: {
      uuid: voting_period_uuid,
    },
  });

  if (!votingPeriod) {
    throw new CustomHttpError("Voting period not found", 404);
  }

  const where = { is_member: true, is_active: true };
  const whereVote = {
    voting_period_id: votingPeriod.id,
    is_validate: 1,
  };

  where[Op.and] = [
    Sequelize.literal(`
          EXISTS (
            SELECT 1
            FROM director_votes dv
            WHERE
              dv.user_id = user.id
              AND dv.voting_period_id = ${votingPeriod.id}
              AND dv.is_validate = 1
          )
        `),
    Sequelize.literal(`
          EXISTS (
            SELECT 1
            FROM commissioner_votes cv
            WHERE
              cv.user_id = user.id
              AND cv.voting_period_id = ${votingPeriod.id}
              AND cv.is_validate = 1
          )
        `),
  ];

  const user_voting = await userModel.count({
    where,
    include: [
      {
        model: directorVoteModel,
        required: false,
        where: { voting_period_id: votingPeriod.id, is_validate: 1 },
      },
      {
        model: commissionerVoteModel,
        required: false,
        where: { voting_period_id: votingPeriod.id, is_validate: 1 },
      },
    ],
    distinct: true,
  });

  const user_voting_persent =
    user_voting === 0 ? 0 : Number(((user_voting / user_all) * 100).toFixed(2));

  const user_pending_voting = Number(user_all - user_voting);
  const user_pending_voting_persent =
    user_pending_voting === 0
      ? 0
      : Number(((user_pending_voting / user_all) * 100).toFixed(2));

  //vote trend
  const voteTrend = await sequelize.query(
    `
    SELECT
        DATE(dv.vote_time) AS date,
        COUNT(DISTINCT dv.user_id) AS total
    FROM director_votes dv
    INNER JOIN commissioner_votes cv
        ON cv.user_id = dv.user_id
        AND cv.voting_period_id = dv.voting_period_id
        AND cv.is_validate = 1
    WHERE
        dv.voting_period_id = :voting_period_id
        AND dv.is_validate = 1
    GROUP BY DATE(dv.vote_time)
    ORDER BY DATE(dv.vote_time)
    `,
    {
      replacements: {
        voting_period_id: votingPeriod.id,
      },
      type: Sequelize.QueryTypes.SELECT,
    },
  );

  const voteMap = new Map();

  voteTrend.forEach((item) => {
    voteMap.set(item.date, Number(item.total));
  });

  const startDate = dayjs(votingPeriod.start_date);
  const endDate = dayjs(votingPeriod.end_date);

  const labels = [];
  const total = [];

  let current = startDate;

  while (current.isSame(endDate, "day") || current.isBefore(endDate, "day")) {
    const date = current.format("YYYY-MM-DD");

    labels.push(date);
    total.push(voteMap.get(date) || 0);

    current = current.add(1, "day");
  }

  //Elections Percentage
  const buildVoteChart = (rows, totalUser) => {
    const chartColors = [
      "primary",
      "warning",
      "success",
      "danger",
      "info",
      "pending",
      "dark",
    ];

    const data = rows.map((item, index) => {
      const totalVote = Number(item.get("total_vote"));

      return {
        uuid: item.uuid,
        name: item.name,
        total_vote: totalVote,
        vote_percent:
          totalUser === 0
            ? 0
            : Number(((totalVote / totalUser) * 100).toFixed(2)),
        color: chartColors[index % chartColors.length],
      };
    });

    // Jumlah user yang sudah vote
    const voted = data.reduce((sum, item) => sum + item.total_vote, 0);

    // Jumlah user yang belum vote
    const notVoted = Math.max(totalUser - voted, 0);

    // Tambahkan Not Voted di urutan pertama
    data.unshift({
      uuid: null,
      name: "Not Voted",
      total_vote: notVoted,
      vote_percent:
        totalUser === 0 ? 0 : Number(((notVoted / totalUser) * 100).toFixed(2)),
      color: "secondary",
    });

    return {
      // ===== Summary =====
      total_user: totalUser,

      voted,
      voted_percent:
        totalUser === 0 ? 0 : Number(((voted / totalUser) * 100).toFixed(2)),

      not_voted: notVoted,
      not_voted_percent:
        totalUser === 0 ? 0 : Number(((notVoted / totalUser) * 100).toFixed(2)),

      // ===== Chart =====
      labels: data.map((item) => item.name),
      total: data.map((item) => item.total_vote),
      vote_percent: data.map((item) => item.vote_percent),
      colors: data.map((item) => item.color),

      // ===== Detail =====
      data,
    };
  };

  //commissioner vote
  const getCommissionerVote = await commissionerCandidateModel.findAll({
    where: { is_active: 1 },
    attributes: [
      "uuid",
      "name",
      [fn("COUNT", col("commissioner_votes.id")), "total_vote"],
    ],
    include: [
      {
        model: commissionerVoteModel,
        attributes: [],
        required: false, // LEFT JOIN
        where: {
          voting_period_id: votingPeriod.id,
          is_validate: 1,
        },
        include: [
          {
            model: userModel,
            attributes: [], // penting
            required: true, // INNER JOIN users
            where: {
              is_active: 1,
              is_member: 1,
            },
          },
        ],
      },
    ],
    group: ["commissioner_candidate.id"],
    order: [["id", "ASC"]],
  });

  const commissionerChart = buildVoteChart(getCommissionerVote, user_all);

  //director vote
  const getDirectorVote = await directorCandidateModel.findAll({
    where: { is_active: 1 },
    attributes: [
      "uuid",
      "name",
      [fn("COUNT", col("director_votes.id")), "total_vote"],
    ],
    include: [
      {
        model: directorVoteModel,
        attributes: [],
        required: false, // LEFT JOIN
        where: {
          voting_period_id: votingPeriod.id,
          is_validate: 1,
        },
        include: [
          {
            model: userModel,
            attributes: [], // penting
            required: true, // INNER JOIN users
            where: {
              is_active: 1,
              is_member: 1,
            },
          },
        ],
      },
    ],
    group: ["director_candidate.id"],
    order: [["id", "ASC"]],
  });

  const directorChart = buildVoteChart(getDirectorVote, user_all);

  return res.status(200).json({
    success: true,
    message: "success",
    data: {
      user_verification_status: {
        total: Number(user_all),
        total_persent: Number(100),
        verified: Number(user_verified),
        verified_persent: Number(user_verified_persent),
        unverified: Number(user_unverified),
        unverified_persent: Number(user_unverified_persent),
      },
      voting_activity_overview: {
        total: Number(user_all),
        total_persent: Number(100),
        vote: user_voting,
        vote_persent: user_voting_persent,
        unvote: user_pending_voting,
        unvote_persent: user_pending_voting_persent,
      },
      vote_trend: {
        labels,
        total,
      },
      commissioner_vote: commissionerChart,
      director_vote: directorChart,
    },
  });
};

module.exports = {
  getDataTable,
  getReportTable,
  getDataTableAttribute,
  getReportDashboard,
};
