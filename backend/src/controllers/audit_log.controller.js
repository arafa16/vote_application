const {
  audit_log: auditLogModel,
  user: userModel,
} = require("../models/index.js");
const { Op, where } = require("sequelize");
const CustomHttpError = require("../utils/custom_http_error.js");

const getDatas = async (req, res) => {
  const { name, sort } = req.query;

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

  const findDatas = await auditLogModel.findAll({
    where,
    order,
  });

  return res.status(200).json({
    success: true,
    message: "success",
    data: findDatas,
  });
};

const getDataTable = async (req, res) => {
  const { search, is_active, sort } = req.query;

  let whereClause = {};
  let whereUser = {};
  let order = [];

  if (sort) {
    const direction = sort.startsWith("-") ? "DESC" : "ASC";
    const columnName = sort.replace(/^-/, "");
    order.push([columnName, direction]);
  } else {
    order.push(["id", "DESC"]);
  }

  if (search) {
    whereUser = {
      ...whereUser,
      [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
    };
  }

  if (is_active) {
    whereClause.is_active = is_active;
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;
  const { rows, count } = await auditLogModel.findAndCountAll({
    where: whereClause,
    include: [
      { model: userModel, where: whereUser, attributes: { exclude: ["id"] } },
    ],
    attributes: { exclude: ["id"] },
    order,
    limit,
    offset,
  });

  const pages = Math.ceil(count / limit);

  return res.status(200).json({
    success: true,
    message: "Get status successfully",
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

  const findData = await auditLogModel.findOne({
    where: { uuid },
    include: [{ model: userModel, attributes: { exclude: ["id"] } }],
    attributes: { exclude: ["id"] },
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

const getCreateAttributes = async (req, res) => {
  const users = await userModel.findAll({
    where: {
      is_active: true,
    },
    attributes: { exclude: ["id"] },
  });

  return res.status(200).json({ message: "success", data: { users } });
};

const getUpdateAttributesById = async (req, res) => {
  const { uuid } = req.params;

  const users = await userModel.findAll({
    where: {
      is_active: true,
    },
    attributes: { exclude: ["id"] },
  });

  const findData = await auditLogModel.findOne({
    where: {
      uuid: uuid,
    },
    include: [{ model: userModel, attributes: { exclude: ["id"] } }],
    attributes: { exclude: ["id"] },
  });

  return res
    .status(200)
    .json({ message: "success", data: findData, attributes: { users } });
};

const createData = async (req, res) => {
  const { user_uuid, activity, description } = req.body;

  if (!user_uuid || !activity) {
    throw new CustomHttpError("user_uuid and activity are required", 400);
  }

  const findUser = await userModel.findOne({
    where: {
      uuid: user_uuid,
    },
  });

  if (!findUser) {
    throw new CustomHttpError("user not found", 404);
  }

  const newData = await auditLogModel.create({
    user_id: findUser.id,
    activity,
    description,
  });

  return res.status(201).json({
    success: true,
    message: "new data created successfully",
    data: newData,
  });
};

const updateData = async (req, res) => {
  const { uuid } = req.params;
  const { user_uuid, activity, description } = req.body;

  if (!user_uuid || !activity) {
    throw new CustomHttpError("user_uuid and activity are required", 400);
  }

  const findData = await auditLogModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  const findUser = await userModel.findOne({
    where: {
      uuid: user_uuid,
    },
  });

  if (!findUser) {
    throw new CustomHttpError("user not found", 404);
  }

  await findData.update({
    user_id: findUser.id,
    activity,
    description,
  });

  return res.status(200).json({
    success: true,
    message: "data updated successfully",
    data: findData,
  });
};

const deleteData = async (req, res) => {
  const { uuid } = req.params;
  const { permanent } = req.query;

  const findData = await auditLogModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  if (permanent) {
    if (permanent === "1") {
      await findData.destroy();

      return res.status(200).json({
        success: true,
        message: "data deleted permanent successfully",
      });
    } else {
      await findData.update({
        is_active: false,
      });

      return res.status(200).json({
        success: true,
        message: "data deleted successfully",
        data: findData,
      });
    }
  }

  await findData.update({
    is_active: false,
  });

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
  getCreateAttributes,
  getUpdateAttributesById,
  updateData,
  deleteData,
};
