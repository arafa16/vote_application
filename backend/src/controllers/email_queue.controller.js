const {
  user: userModel,
  email_queue: emailQueueModel,
  audit_log: auditLogModel,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const CustomHttpError = require("../utils/custom_http_error.js");

const getDataTable = async (req, res) => {
  const { search, is_active, sort, status, type } = req.query;

  let whereClause = {};
  let order = [];

  if (sort) {
    const direction = sort.startsWith("-") ? "DESC" : "ASC";
    const columnName = sort.replace(/^-/, "");
    order.push([columnName, direction]);
  }

  if (search) {
    whereClause[Op.or] = [
      sequelize.literal(`
        JSON_SEARCH(\`to\`, 'one', '%${search}%') IS NOT NULL
    `),
      {
        subject: {
          [Op.like]: `%${search}%`,
        },
      },
    ];
  }

  if (is_active) {
    whereClause.is_active = is_active;
  }

  if (type) {
    whereClause.type = type;
  }

  if (status) {
    whereClause.status = status;
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;
  const { rows, count } = await emailQueueModel.findAndCountAll({
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

  const findData = await emailQueueModel.findOne({
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

const updateStatusData = async (req, res) => {
  const { uuid } = req.params;
  const { status } = req.body;

  const findData = await emailQueueModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  await findData.update({
    status: status,
  });

  return res.status(201).json({
    success: true,
    message: "success",
    data: { uuid: findData.uuid },
  });
};

const deleteData = async (req, res) => {
  const { uuid } = req.params;
  const { permanent } = req.query;

  const transaction = await sequelize.transaction();

  try {
    const email = await emailQueueModel.findOne({
      where: { uuid },
      transaction,
    });

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "email not found",
      });
    }

    if (Boolean(permanent) === true) {
      await emailQueueModel.destroy({
        where: { id: email.id },
        transaction,
      });
    } else {
      await email.update({ is_active: false }, { transaction }); // Assuming 4 is the ID for 'deleted' status
    }

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while deleting the user",
    });
  }
};

const sendEmailById = async (req, res) => {
  const { uuid } = req.params;

  const email = await emailQueueModel.findOne({
    where: {
      uuid: uuid,
    },
  });

  if (!email) {
    throw new CustomHttpError("email not found", 404);
  }

  transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const transaction = await sequelize.transaction();

  try {
    await email.update(
      {
        status: "processing",
      },
      { transaction },
    );

    await transporter.sendMail({
      from: '"Vote-Application" <sekretariat_kopkarla@kopkarla.co.id>',
      to: email.to,
      cc: email.cc,
      bcc: email.bcc,
      subject: email.subject,
      html: email.body,
    });

    await email.update(
      {
        status: "sent",
        sent_at: new Date(),
        error_message: null,
      },
      { transaction },
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new CustomHttpError(error.message, 500);
  }

  return res.status(200).json({
    success: true,
    message: "send email success",
  });
};

module.exports = {
  getDataTable,
  getDataById,
  updateStatusData,
  deleteData,
  sendEmailById,
};
