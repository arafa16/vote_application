const {
  user: userModel,
  status: statusModel,
  company: companyModel,
  privilege: privilegeModel,
  voting_period: votingPeriodModel,
  director_candidate: directorCandidateModel,
  director_vote: directorVoteModel,
  commissioner_candidate: commissionerCandidateModel,
  commissioner_vote: commissionerVoteModel,
  sequelize,
} = require("../models");

const CustomHttpError = require("../utils/custom_http_error");
const { Op, Sequelize, fn, col } = require("sequelize");
const crypto = require("crypto");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const excelJs = require("exceljs");
const dayjs = require("dayjs");

const importDataUser = async (req, res) => {
  if (!req.files || !req.files.file) {
    throw new CustomHttpError("No file uploaded", 400);
  }

  const { file } = req.files;

  const ext = path.extname(file.name).toLowerCase();

  if (ext !== ".xlsx") {
    throw new CustomHttpError("Only .xlsx file allowed", 400);
  }

  const fileName = `${crypto.randomUUID()}${ext}`;
  const filePath = `./public/assets/imports/${fileName}`;

  await file.mv(filePath);

  const transaction = await sequelize.transaction();

  try {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

    const users = [];

    for (const row of rows) {
      const company = await companyModel.findOne({
        where: {
          name: {
            [Op.like]: `%${row.company}%`,
          },
        },
        transaction,
      });

      if (!company) {
        throw new CustomHttpError(`Company "${row.company}" not found`, 400);
      }

      const status = await statusModel.findOne({
        where: {
          name: row.status,
        },
        transaction,
      });

      if (!status) {
        throw new CustomHttpError(`Status "${row.status}" not found`, 400);
      }

      const emailExist = await userModel.findOne({
        where: {
          email: row.email,
        },
        transaction,
      });

      if (emailExist) {
        throw new CustomHttpError(`Email "${row.email}" already exists`, 400);
      }

      const privilege = await privilegeModel.create(
        {
          name: row.name,
          tata_cara_voting: true,
          profile_kandidat_pengawas: true,
          profile_kandidat_pengurus: true,
          mulai_voting: true,
          riwayat_voting: true,
          dashboard: false,
          status_voting_anggota: false,
          user_data: false,
          setting: false,
          is_active: true,
        },
        { transaction },
      );

      const user = await userModel.create(
        {
          membership_number: row.membership_number,
          name: row.name,
          email: row.email,
          company_id: company.id,
          status_id: status.id,
          privilege_id: privilege.id,
          is_member: row.is_member,
          created_by: req.user.name,
        },
        { transaction },
      );

      users.push(user);
    }

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: `${users.length} users imported successfully`,
      data: users,
    });
  } catch (error) {
    await transaction.rollback();

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

const exportDataStatusVoting = async (req, res) => {
  const {
    search,
    is_active,
    status_user,
    status_vote,
    company,
    is_member,
    voting_period_uuid,
  } = req.query;

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

  //sort
  const allowedSort = [
    "name",
    "createdAt",
    "status_vote",
    "created_by",
    "membership_number",
    "is_verified",
  ];

  const sortBy = allowedSort.includes(req.query.sortBy)
    ? req.query.sortBy
    : "name";

  const sort = req.query.sort === "desc" ? "DESC" : "ASC";

  let order;

  if (sortBy === "status_vote") {
    order = [
      [
        Sequelize.literal(`
        CASE
          WHEN EXISTS (
            SELECT 1
            FROM director_votes dv
            WHERE
              dv.user_id = user.id
              AND dv.voting_period_id = ${votingPeriod.id}
              AND dv.is_validate = 1
          )
          AND EXISTS (
            SELECT 1
            FROM commissioner_votes cv
            WHERE
              cv.user_id = user.id
              AND cv.voting_period_id = ${votingPeriod.id}
              AND cv.is_validate = 1
          )
          THEN 1
          ELSE 0
        END
      `),
        sort,
      ],
    ];
  } else {
    order = [[sortBy, sort]];
  }

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
      {
        model: statusModel,
        where: {
          code: {
            [Op.in]: [2, 3],
          },
        },
      },
    ],
    order,
    distinct: true,
  });

  let workbook = new excelJs.Workbook();
  const sheet = workbook.addWorksheet("data voting");

  sheet.columns = [
    { header: "NO", key: "no", width: 25 },
    { header: "Nama", key: "name", width: 25 },
    { header: "Nomor Anggota", key: "membership_number", width: 25 },
    { header: "Group", key: "company", width: 25 },
    { header: "Verification Status", key: "is_verified", width: 25 },
    { header: "Voting Send", key: "director_vote_date", width: 25 },
    { header: "Status Voting", key: "status_vote", width: 25 },
    { header: "Created Date", key: "created_at", width: 25 },
    { header: "Created By", key: "created_by", width: 25 },
  ];

  try {
    rows.forEach((item, index) => {
      sheet.addRow({
        no: index + 1,
        membership_number: item.membership_number,
        name: item.name,
        is_verified: item.is_verified ? "verified" : "unverified",
        is_member: item.is_member,
        company: item.company.name,
        director_vote_date: item.director_votes[0]
          ? dayjs(item.director_votes[0].vote_time).format(
              "YYYY-MM-DD HH:mm:ss",
            )
          : "-",
        commissioner_vote_date: item.commissioner_votes[0]
          ? dayjs(item.commissioner_votes[0].vote_time).format(
              "YYYY-MM-DD HH:mm:ss",
            )
          : "-",
        status_vote:
          item.director_votes.length > 0 && item.commissioner_votes.length > 0
            ? "sudah memilih"
            : "belum memilih",
        created_at: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        created_by: item.created_by,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=data_voting.xlsx",
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      datas: {
        message: error.message,
      },
    });
  }
};

module.exports = {
  importDataUser,
  exportDataStatusVoting,
};
