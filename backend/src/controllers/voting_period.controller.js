const {
  user: userModel,
  voting_period: votingPeriodModel,
  director_candidate: directorCandidateModel,
  director_vote: directorVoteModel,
  commissioner_candidate: commissionerCandidateModel,
  commissioner_vote: commissionerVoteModel,
} = require("../models/index.js");
const { Op, where } = require("sequelize");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const CustomHttpError = require("../utils/custom_http_error.js");
const { createLogHandler } = require("./write_log.controller.js");

const getDatas = async (req, res) => {
  const { uuid, name, sort, status } = req.query;

  const where = {};
  let order = [];

  if (sort) {
    const direction = sort.startsWith("-") ? "DESC" : "ASC";
    const columnName = sort.replace(/^-/, "");
    order.push([columnName, direction]);
  }

  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    };
  }

  if (status) {
    where.is_active = status;
  } else {
    where.is_active = true;
  }

  const findDatas = await votingPeriodModel.findAll({ where });

  return res.status(200).json({
    success: true,
    message: "success",
    data: findDatas,
  });
};

const getDataTable = async (req, res) => {
  const { search, is_active, sort } = req.query;

  let whereClause = {};
  let order = [];

  if (sort) {
    const direction = sort.startsWith("-") ? "DESC" : "ASC";
    const columnName = sort.replace(/^-/, "");
    order.push([columnName, direction]);
  }

  if (search) {
    whereClause = {
      ...whereClause,
      [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
    };
  }

  if (is_active) {
    whereClause.is_active = is_active;
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;
  const { rows, count } = await votingPeriodModel.findAndCountAll({
    where: whereClause,
    limit,
    offset,
  });

  const pages = Math.ceil(count / limit);

  return res.status(200).json({
    success: true,
    message: "success",
    data: rows,
    meta: {
      total: count,
      page,
      limit,
      pages,
    },
  });
};

const getDataById = async (req, res) => {
  const { uuid } = req.params;

  const findData = await votingPeriodModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "success",
    data: findData,
  });
};

const getDataCommissionerNDirectorById = async (req, res) => {
  const { voting_period_uuid, user_uuid, is_validate } = req.query;

  const findData = await votingPeriodModel.findOne({
    where: { uuid: voting_period_uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  const findUser = await userModel.findOne({
    where: { uuid: user_uuid },
  });

  if (!findUser) {
    throw new CustomHttpError("user not found", 404);
  }

  const findDirector = await directorVoteModel.findOne({
    where: {
      voting_period_id: findData.id,
      user_id: findUser.id,
      is_validate: is_validate,
    },
    include: [
      {
        model: directorCandidateModel,
        attributes: {
          exclude: ["id"],
        },
      },
    ],
    attributes: {
      exclude: ["id"],
    },
  });

  const findCommissioner = await commissionerVoteModel.findOne({
    where: {
      voting_period_id: findData.id,
      user_id: findUser.id,
      is_validate: is_validate,
    },
    include: [
      {
        model: commissionerCandidateModel,
        attributes: {
          exclude: ["id"],
        },
      },
    ],
    attributes: {
      exclude: ["id"],
    },
  });

  let director_check = false;

  const cekDataDirectorVote = await directorVoteModel.findOne({
    where: {
      voting_period_id: findData.id,
      user_id: findUser.id,
      is_validate: 1,
    },
    attributes: {
      exclude: ["id"],
    },
  });

  if (cekDataDirectorVote) {
    director_check = true;
  }

  let commissioner_check = false;

  const cekDataCommissionerVote = await commissionerVoteModel.findOne({
    where: {
      voting_period_id: findData.id,
      user_id: findUser.id,
      is_validate: 1,
    },
    attributes: {
      exclude: ["id"],
    },
  });

  if (cekDataCommissionerVote) {
    commissioner_check = true;
  }

  return res.status(200).json({
    success: true,
    message: "success",
    data: {
      director: findDirector,
      commissioner: findCommissioner,
      user: { name: findUser.name },
      commissioner_check,
      director_check,
    },
  });
};

const updateDataCommissionerNDirectorById = async (req, res) => {
  const { uuid } = req.params;

  const { commissioner_vote_uuid, director_vote_uuid } = req.body;

  if (!commissioner_vote_uuid || !director_vote_uuid) {
    throw new CustomHttpError("Incomplete data, please check your choose", 403);
  }

  const findVotingPeriod = await votingPeriodModel.findOne({
    where: {
      uuid: uuid,
    },
  });

  if (!findVotingPeriod) {
    throw new CustomHttpError("voting period not found", 404);
  }

  const commissionerVoteFind = await commissionerVoteModel.findOne({
    where: {
      uuid: commissioner_vote_uuid,
      voting_period_id: findVotingPeriod.id,
    },
  });

  if (!commissionerVoteFind) {
    throw new CustomHttpError("commissioner vote not found", 404);
  }

  const directorVoteFind = await directorVoteModel.findOne({
    where: {
      uuid: director_vote_uuid,
      voting_period_id: findVotingPeriod.id,
    },
  });

  if (!directorVoteFind) {
    throw new CustomHttpError("director vote not found", 404);
  }

  const date_now = new Date();

  await commissionerVoteFind.update({
    is_validate: true,
    vote_time: date_now,
  });

  await directorVoteFind.update({
    is_validate: true,
    vote_time: date_now,
  });

  return res.status(201).json({
    success: true,
    message: "success",
    data: null,
  });
};

const createData = async (req, res) => {
  const { name, description, start_date, end_date } = req.body;

  if (!name) {
    throw new CustomHttpError("name cannot be null", 400);
  }

  const newData = await votingPeriodModel.create({
    name,
    description,
    start_date,
    end_date,
  });

  await createLogHandler({
    user_id: req.user.id,
    activity: "voting period-create",
    description: `${req.user.name} has created voting period ${name}`,
  });

  return res.status(201).json({
    success: true,
    message: "success",
    data: newData,
  });
};

const updateData = async (req, res) => {
  const { uuid } = req.params;
  const { name, description, start_date, end_date } = req.body;

  const findData = await votingPeriodModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  await findData.update({
    name,
    description,
    start_date,
    end_date,
  });

  await createLogHandler({
    user_id: req.user.id,
    activity: "voting period-update",
    description: `${req.user.name} has updated voting period ${name}`,
  });

  return res.status(200).json({
    success: true,
    message: "data updated successfully",
  });
};

const deleteData = async (req, res) => {
  const { uuid } = req.params;
  const { permanent } = req.query;

  const findData = await votingPeriodModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  if (Boolean(permanent) === true) {
    await createLogHandler({
      user_id: req.user.id,
      activity: "voting period-delete",
      description: `${req.user.name} has deleted voting period ${findData.name}`,
    });

    await findData.destroy();
  } else {
    await findData.update({
      is_active: false,
    });
  }

  return res.status(200).json({
    success: true,
    message: "data deleted successfully",
  });
};

module.exports = {
  getDatas,
  getDataTable,
  getDataById,
  getDataCommissionerNDirectorById,
  updateDataCommissionerNDirectorById,
  createData,
  updateData,
  deleteData,
};
