const {
  user: userModel,
  voting_period: votingPeriodModel,
  director_candidate: directorCandidateModel,
  director_vote: directorVoteModel,
  commissioner_candidate: commissionerCandidateModel,
  commissioner_vote: commissionerVoteModel,
  company: companyModel,
} = require("../models/index.js");
const { Op, where } = require("sequelize");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const CustomHttpError = require("../utils/custom_http_error.js");
const { createLogHandler } = require("./write_log.controller.js");

const getDataTable = async (req, res) => {
  const {
    search,
    is_active,
    sort,
    status,
    status_vote,
    company,
    is_member,
    voting_period_uuid,
  } = req.query;

  const whereClause = {
    [Op.and]: [],
  };
  let order = [];
  let dataTable = [];

  if (sort) {
    const direction = sort.startsWith("-") ? "DESC" : "ASC";
    const columnName = sort.replace(/^-/, "");
    order.push([columnName, direction]);
  }

  if (search) {
    whereClause[Op.and].push({
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { membership_number: { [Op.like]: `%${search}%` } },
      ],
    });
  }

  if (company) {
    const findData = await companyModel.findOne({
      where: {
        uuid: company,
      },
    });

    if (findData) {
      whereClause[Op.and].push({
        company_id: findData.id,
      });
    }
  }

  if (is_member !== undefined) {
    whereClause[Op.and].push({
      is_member: is_member === "true",
    });
  } else {
    whereClause[Op.and].push({
      is_member: true,
    });
  }

  if (is_active !== undefined) {
    whereClause[Op.and].push({
      is_active: is_active === "true",
    });
  } else {
    whereClause[Op.and].push({
      is_active: true,
    });
  }

  if (whereClause[Op.and].length === 0) {
    delete whereClause[Op.and];
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const { count, rows } = await userModel.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: companyModel,
      },
    ],
    order,
    limit,
    offset,
  });

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
    throw new CustomHttpError("voting periode not set", 404);
  }

  for (const data of rows) {
    const findDirectorVote = await directorVoteModel.findAll({
      where: {
        user_id: data.id,
        voting_period_id: voting_period_id,
        is_validate: 1,
      },
    });

    const findCommissionerVote = await commissionerVoteModel.findAll({
      where: {
        user_id: data.id,
        voting_period_id: voting_period_id,
        is_validate: 1,
      },
    });

    const status =
      findDirectorVote.length > 0 && findCommissionerVote.length > 0
        ? true
        : false;

    dataTable.push({
      uuid: data.uuid,
      name: data.name,
      membership_number: data.membership_number,
      verification_date: data.verification_date,
      company: { uuid: data.company.uuid, name: data.company.name },
      is_member: data.is_member,
      director_vote_date: findDirectorVote,
      commissioner_vote_date: findCommissionerVote,
      status_vote: status,
    });
  }

  const pages = Math.ceil(count / limit);

  if (status_vote !== undefined) {
    dataTable = dataTable.filter(
      (item) => item.status_vote === (status_vote === "true"),
    );
  }

  return res.status(200).json({
    success: true,
    message: "success",
    data: dataTable,
    meta: {
      total: count,
      page,
      limit,
      pages,
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
    { name: "Belum Voting", value: false },
    { name: "Sudah Voting", value: true },
  ];

  return res.status(200).json({
    success: true,
    message: "success",
    data: { company, status_voting },
  });
};

module.exports = {
  getDataTable,
  getDataTableAttribute,
};
