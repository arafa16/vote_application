const {
  audit_log: auditLogModel,
  user: userModel,
} = require("../models/index.js");
const { Op, where } = require("sequelize");
const CustomHttpError = require("../utils/custom_http_error.js");

const createLogHandler = async (params) => {
  const { user_id, activity, description } = params;
  try {
    const create_log = await auditLogModel.create({
      user_id,
      activity,
      description,
    });

    return create_log;
  } catch (error) {
    throw new CustomHttpError(error, 500);
  }
};

module.exports = {
  createLogHandler,
};
