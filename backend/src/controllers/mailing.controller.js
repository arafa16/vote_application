const {
  user: userModel,
  email_queue: emailQueueModel,
  audit_log: auditLogModel,
  sequelize,
} = require("../models");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const CustomHttpError = require("../utils/custom_http_error.js");
const { createLogHandler } = require("./write_log.controller.js");
const dayjs = require("dayjs");
const successActivationTemplate = require("../utils/successActivationTemplate.js");
const invitationEmailTemplate = require("../utils/invitationEmailTemplate.js");

const sendEmailInvitation = async (req, res) => {
  const { uuid } = req.params;

  const result = await userModel.findOne({
    where: {
      uuid: uuid,
    },
  });

  if (!result) {
    throw new CustomHttpError("user not found", 404);
  }

  const token = jwt.sign({ uuid: result.uuid }, process.env.JWT_SECRET, {
    expiresIn: "12d",
  });

  const transaction = await sequelize.transaction();

  try {
    await result.update(
      {
        verification_token: token,
      },
      { transaction },
    );

    const link_reset = `${process.env.LINK_FRONTEND}/invite/${token}`;

    await saveEmailData(
      {
        user_id: result?.id,
        to: result?.email,
        bcc: ["it.dev@kopkarla.co.id"],
        subject: "Undangan Aktivasi Akun Aplikasi Kopkarla",
        body: invitationEmailTemplate(result.name, link_reset),
        type: "invitation",
      },
      transaction,
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new CustomHttpError(error.message, 500);
  }

  return res.status(200).json({
    success: true,
    message:
      "The invitation email has been sent successfully. Please ask the user to check their inbox or spam folder.",
  });
};

const activationUser = async (req, res) => {
  const { token } = req.params;

  if (!token || token === null) {
    throw new CustomHttpError("token not found", 404);
  }

  try {
    verify = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new CustomHttpError(
        "Your activation link has expired. Please request a new activation email.",
        403,
      );
    }

    if (error.name === "JsonWebTokenError") {
      throw new CustomHttpError(
        "Invalid activation link. Please use the latest activation email.",
        403,
      );
    }

    throw error;
  }

  const user = await userModel.findOne({
    where: {
      uuid: verify.uuid,
    },
  });

  if (!user) {
    throw new CustomHttpError(
      "Your account has not been activated yet. Please check your email and complete the verification process before logging in.",
      403,
    );
  }

  const date_now = new Date();
  const status = Boolean(verify.activation);

  const transaction = await sequelize.transaction();

  const linkLogin = `${process.env.LINK_FRONTEND}/login`;

  try {
    await user.update(
      {
        is_verified: status,
        verification_date: date_now,
        status_id: 2,
        verification_token: null,
      },
      { transaction },
    );

    await saveEmailData(
      {
        user_id: user?.id,
        to: user?.email,
        bcc: ["formatur@kopkarla.co.id"],
        subject: "Aktivasi Akun Berhasil - Aplikasi Kopkarla",
        body: successActivationTemplate(user?.name, linkLogin),
        type: "notification",
      },
      transaction,
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new CustomHttpError(err.message, 500);
  }

  return res.status(201).json({
    success: true,
    message:
      "Congratulations! Your account has been activated successfully. Please log in to access the application.",
  });
};

const saveEmailData = async (props, transaction = null) => {
  return await emailQueueModel.create(
    {
      user_id: props.user_id,
      to: Array.isArray(props.to) ? props.to : [props.to],
      cc: props.cc ? (Array.isArray(props.cc) ? props.cc : [props.cc]) : [],
      bcc: props.bcc
        ? Array.isArray(props.bcc)
          ? props.bcc
          : [props.bcc]
        : [],
      subject: props.subject,
      body: props.body,
      type: props.type,
      status: "pending",
      retry_count: 0,
      error_message: null,
      scheduled_at: props.scheduled_at || new Date(),
      sent_at: null,
    },
    {
      transaction,
    },
  );
};

module.exports = {
  sendEmailInvitation,
  activationUser,
  saveEmailData,
};
