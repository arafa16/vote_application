const {
  user: userModel,
  company: companyModel,
  status: statusModel,
  privilege: privilegeModel,
  audit_log: auditLogModel,
  sequelize,
} = require("../models/index.js");

const argon = require("argon2");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const CustomHttpError = require("../utils/custom_http_error.js");
const { createLogHandler } = require("./write_log.controller.js");
const { saveEmailData } = require("./mailing.controller.js");

const resetPasswordEmailTemplate = require("../utils/resetPasswordEmailTemplate.js");
const verificationEmailTemplate = require("../utils/verificationEmailTemplate");

const register = async (req, res) => {
  const {
    membership_number,
    name,
    email,
    password,
    phone_number,
    company_uuid,
  } = req.body;

  if (!name || !email || !password || !membership_number) {
    throw new CustomHttpError(
      "name, email, password, and membership number cannot be null",
      400,
    );
  }

  const find_email = await userModel.findOne({
    where: {
      email,
    },
  });

  if (find_email !== null) {
    throw new CustomHttpError("email already registered", 409);
  }

  let company_id = null;

  if (company_uuid) {
    const find_company = await companyModel.findOne({
      where: {
        uuid: company_uuid,
      },
    });

    if (find_company === null) {
      throw new CustomHttpError("company not found", 404);
    } else {
      company_id = find_company.id;
    }
  }

  const has_password = await argon.hash(password);

  const register = await userModel.create({
    membership_number,
    name,
    email,
    password: has_password,
    phone_number,
    company_id,
    user_status_id: 1,
  });

  const user = await userModel.findOne({
    where: {
      uuid: register.uuid,
    },
    attributes: {
      exclude: ["id", "password"],
    },
  });

  const new_privilege = await privilegeModel.create({
    name,
    dashboard: true,
  });

  register.privilege_id = new_privilege.id;
  await register.save();

  return res.status(201).json({
    success: true,
    message: "success register, please wait for admin to activate your account",
    data: {
      user: register,
    },
  });
};

const registerAttribute = async (req, res) => {
  const company = await companyModel.findAll({
    where: { is_active: true },
  });

  return res.status(200).json({
    success: true,
    message: "success",
    data: {
      company,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomHttpError("email and password cannot be null", 400);
  }

  const findUser = await userModel.findOne({
    where: {
      email,
    },
    include: [
      {
        model: statusModel,
        attributes: ["name", "code"],
      },
    ],
  });

  if (!findUser) {
    throw new Error("user not found");
  }

  if (findUser?.status?.code !== "2") {
    throw new CustomHttpError(
      `you don't have access, status account is ${findUser?.status?.name}, not active`,
      403,
    );
  }

  const match = await argon.verify(findUser.password, password);

  if (!match) {
    throw new CustomHttpError(`email or password is incorrect`, 401);
  }

  const token = jwt.sign(
    {
      uuid: findUser.uuid,
      name: findUser.name,
      email: findUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  req.session.token = token;

  await createLogHandler({
    user_id: findUser.id,
    activity: "login",
    description: `${findUser.name} has logged in`,
  });

  return res.status(200).json({
    success: true,
    message: "login success",
    data: {
      token,
    },
  });
};

const getMe = async (req, res) => {
  const user = await userModel.findOne({
    where: {
      uuid: req.user.uuid,
    },
    include: [
      {
        model: statusModel,
        attributes: {
          exclude: ["id"],
        },
      },
      {
        model: companyModel,
        attributes: {
          exclude: ["id"],
        },
      },
      {
        model: privilegeModel,
        attributes: {
          exclude: ["id"],
        },
      },
    ],
    attributes: {
      exclude: ["id", "password"],
    },
  });

  return res.status(200).json({
    success: true,
    message: "success",
    data: {
      user,
    },
  });
};

const sendRequestEmailReset = async (req, res) => {
  const { email } = req.body;

  const result = await userModel.findOne({
    where: {
      email,
    },
    include: [
      {
        model: statusModel,
        attributes: ["name"],
      },
    ],
  });

  if (!result) {
    throw new CustomHttpError("User not found.", 404);
  }

  const transaction = await sequelize.transaction();

  try {
    const resetToken = jwt.sign(
      {
        uuid: result.uuid,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "12d",
      },
    );

    const linkReset = `${process.env.LINK_FRONTEND}/reset/${resetToken}`;

    await createLogHandler(
      {
        user_id: result.id,
        activity: "send_request_password",
        description: `${result.name} requested a password reset.`,
      },
      transaction,
    );

    await saveEmailData(
      {
        user_id: result.id,
        to: result.email,
        bcc: ["it.dev@kopkarla.co.id"],
        subject: "Reset Password Aplikasi Kopkarla",
        body: resetPasswordEmailTemplate(result.name, linkReset),
        type: "password_reset",
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
      "A password reset request has been created successfully. Please check your email for further instructions.",
  });
};

const getTokenReset = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new CustomHttpError("token not found", 404);
  }

  //validation token
  const verify = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findOne({
    where: {
      uuid: verify.uuid,
    },
    attributes: ["name", "email"],
  });

  return res.status(200).json({
    success: true,
    message: "check token successed",
    data: {
      user,
    },
  });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, conf_password, invitation } = req.body;

  if (!token || token === null) {
    throw new CustomHttpError("token not found", 404);
  }

  if (password !== conf_password) {
    throw new CustomHttpError("password not match, please check again", 401);
  }

  const verify = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findOne({
    where: {
      uuid: verify.uuid,
    },
  });

  const transaction = await sequelize.transaction();

  try {
    const hashPassword = await argon.hash(password);

    await user.update(
      {
        password: hashPassword,
      },
      { transaction },
    );

    await createLogHandler(
      {
        user_id: user.id,
        activity: "setup_password",
        description: `${user.name} set up their account password.`,
      },
      transaction,
    );

    if (Number(invitation) === 1) {
      const activationToken = jwt.sign(
        {
          uuid: user.uuid,
          activation: true,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "12d",
        },
      );

      const linkVerification = `${process.env.LINK_FRONTEND}/activation/${activationToken}`;

      await saveEmailData(
        {
          user_id: user.id,
          to: user.email,
          bcc: ["it.dev@kopkarla.co.id"],
          subject: "Verifikasi Aktivasi Akun Aplikasi Kopkarla",
          body: verificationEmailTemplate(user.name, linkVerification),
          type: "verification",
        },
        transaction,
      );
    }

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw new CustomHttpError(err.message, 500);
  }

  return res.status(200).json({
    success: true,
    message: "Password has been reset successfully.",
  });
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw new CustomHttpError(err.message, 400);

    return res.status(200).json({
      success: true,
      message: "logout success",
    });
  });
};

module.exports = {
  register,
  registerAttribute,
  login,
  getMe,
  sendRequestEmailReset,
  getTokenReset,
  resetPassword,
  logout,
};
