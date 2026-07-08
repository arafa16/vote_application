const moment = require("moment/moment.js");
const {
  vote: voteModel,
  voting_period: votingPeriodModel,
  candidate: candidateModel,
  user: userModel,
} = require("../models/index.js");
const CustomHttpError = require("../utils/custom_http_error.js");
const { createLogHandler } = require("./write_log.controller.js");

const getDatas = async (req, res) => {
  const { uuid, name, sort } = req.query;

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

  const findDatas = await voteModel.findAll({ where, order });

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
  const { rows, count } = await voteModel.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order,
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

  const findData = await voteModel.findOne({
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

const createData = async (req, res) => {
  const { voting_period_uuid, user_uuid, candidate_uuid } = req.body;

  if (!voting_period_uuid || !user_uuid || !candidate_uuid) {
    throw new CustomHttpError("vote not valid", 400);
  }

  const findVotingPeriod = await votingPeriodModel.findOne({
    where: { uuid: voting_period_uuid },
  });

  if (!findVotingPeriod) {
    throw new CustomHttpError("voting period not found", 404);
  }

  const findUser = await userModel.findOne({
    where: { uuid: user_uuid },
  });

  if (!findUser) {
    throw new CustomHttpError("user not found", 404);
  }

  const findCandidate = await candidateModel.findOne({
    where: { uuid: candidate_uuid },
  });

  if (!findCandidate) {
    throw new CustomHttpError("candidate not found", 404);
  }

  const newData = await voteModel.create({
    voting_period_id: findVotingPeriod.id,
    user_id: findUser.id,
    candidate_id: findCandidate.id,
    vote_time: new Date(),
    ip_address: req.ip,
  });

  await createLogHandler({
    user_id: findUser.id,
    activity: "vote",
    description: `${findUser.name} has vote ${findCandidate.name}`,
  });

  return res.status(201).json({
    success: true,
    message: "success",
    data: newData,
  });
};

const updateData = async (req, res) => {
  const { uuid } = req.params;

  const { voting_period_uuid, user_uuid, candidate_uuid } = req.body;

  if (!voting_period_uuid || !user_uuid || !candidate_uuid) {
    throw new CustomHttpError("vote not valid", 400);
  }

  const findData = await voteModel.findOne({
    where: { uuid },
  });

  const findVotingPeriod = await votingPeriodModel.findOne({
    where: { uuid: voting_period_uuid },
  });

  if (!findVotingPeriod) {
    throw new CustomHttpError("voting period not found", 404);
  }

  const findUser = await userModel.findOne({
    where: { uuid: user_uuid },
  });

  if (!findUser) {
    throw new CustomHttpError("user not found", 404);
  }

  const findCandidate = await candidateModel.findOne({
    where: { uuid: candidate_uuid },
  });

  if (!findCandidate) {
    throw new CustomHttpError("candidate not found", 404);
  }

  const newData = await findData.update({
    voting_period_id: findVotingPeriod.id,
    user_id: findUser.id,
    candidate_id: findCandidate.id,
    vote_time: new Date(),
    ip_address: req.ip,
  });

  await createLogHandler({
    user_id: findUser.id,
    activity: "vote-update",
    description: `${findUser.name} has updated vote ${findCandidate.name}`,
  });

  return res.status(201).json({
    success: true,
    message: "success",
    data: newData,
  });
};

const deleteData = async (req, res) => {
  const { uuid } = req.params;
  const { permanent } = req.query;

  const findData = await voteModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  if (Boolean(permanent) === true) {
    await createLogHandler({
      user_id: req.user.id,
      activity: "vote-delete",
      description: `${req.user.name} has deleted vote ${findData.name}`,
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
  createData,
  updateData,
  deleteData,
};
