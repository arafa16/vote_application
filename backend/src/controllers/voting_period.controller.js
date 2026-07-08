const { voting_period: votingPeriodModel } = require("../models/index.js");
const { Op } = require("sequelize");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
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
  createData,
  updateData,
  deleteData,
};
