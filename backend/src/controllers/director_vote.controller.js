const moment = require("moment/moment.js");
const {
  commissioner_vote: commissionerVoteModel,
  director_vote: directorVoteModel,
  voting_period: votingPeriodModel,
  director_candidate: directorCandidateModel,
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

  const findDatas = await directorVoteModel.findAll({ where, order });

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
  const { rows, count } = await directorVoteModel.findAndCountAll({
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

  const findData = await directorVoteModel.findOne({
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

const getDataByUserNPeriod = async (req, res) => {
  const findData = await directorVoteModel.findOne({
    where: { user_id: req.user_id, voting_period_id: req.vote_period_id },
    include: [
      {
        model: directorCandidateModel,
        attributes: {
          exclude: ["id"],
        },
      },
    ],
  });

  let director_check = false;

  const cekDataDirectorVote = await directorVoteModel.findOne({
    where: {
      voting_period_id: req.vote_period_id,
      user_id: req.user_id,
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
      voting_period_id: req.vote_period_id,
      user_id: req.user_id,
      is_validate: 1,
    },
    attributes: {
      exclude: ["id"],
    },
  });

  if (cekDataCommissionerVote) {
    commissioner_check = true;
  }

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "success",
    data: findData,
    data_check: {
      commissioner_check,
      director_check,
    },
  });
};

const createData = async (req, res) => {
  const newData = await directorVoteModel.create({
    voting_period_id: req.voting_period_id,
    user_id: req.user_id,
    director_candidate_id: req.director_candidate_id,
    ip_address: req.ip,
  });

  await createLogHandler({
    user_id: req.user_id,
    activity: "director_vote",
    description: `${req.user_name} has director vote ${req.director_candidate_name}`,
  });

  return res.status(201).json({
    success: true,
    message: "success",
  });
};

const updateData = async (req, res) => {
  const { uuid } = req.params;

  const { voting_period_uuid, user_uuid, director_candidate_uuid } = req.body;

  if (!voting_period_uuid || !user_uuid || !director_candidate_uuid) {
    throw new CustomHttpError("vote not valid", 400);
  }

  const findData = await directorVoteModel.findOne({
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

  const findDirectorCandidate = await directorCandidateModel.findOne({
    where: { uuid: director_candidate_uuid },
  });

  if (!findDirectorCandidate) {
    throw new CustomHttpError("director candidate not found", 404);
  }

  const newData = await findData.update({
    voting_period_id: findVotingPeriod.id,
    user_id: findUser.id,
    director_candidate_id: findDirectorCandidate.id,
    ip_address: req.ip,
  });

  await createLogHandler({
    user_id: findUser.id,
    activity: "director_vote-update",
    description: `${findUser.name} has updated director vote ${findDirectorCandidate.name}`,
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

  const findData = await directorVoteModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  if (Boolean(permanent) === true) {
    await createLogHandler({
      user_id: req.user.id,
      activity: "director_vote-delete",
      description: `${req.user.name} has deleted director vote ${findData.name}`,
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
  getDataByUserNPeriod,
  createData,
  updateData,
  deleteData,
};
