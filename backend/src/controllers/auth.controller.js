const {
  user: userModel,
  company: companyModel,
  status: statusModel,
  privilege: privilegeModel,
  audit_log: auditLogModel,
} = require("../models/index.js");

const argon = require("argon2");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const CustomHttpError = require("../utils/custom_http_error.js");
const { createLogHandler } = require("./write_log.controller.js");

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

const sendEmailReset = async (req, res) => {
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
    throw new CustomHttpError("user not found", 404);
  }

  const token = jwt.sign({ uuid: result.uuid }, process.env.JWT_SECRET, {
    expiresIn: "60m",
  });

  const link = `${process.env.LINK_FRONTEND}/reset/${token}`;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const emailMessage = {
    from: '"Vote-Application" <no-replay@kopkarla.co.id>',
    to: email,
    subject: "Reset Password",
    html: `
      <p>Hai ${result.name}</p>
      <p>Click this to reset password</p>
      <p>
        <a href="${link}" style="
          display: inline-block;
          padding: 10px 30px;
          font-size: 14px;
          color: #fff;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 5px;
        ">Reset Password</a>
      </p>
      <p>Thanks</p>
    `,
  };

  await transporter.sendMail(emailMessage);

  return res.status(200).json({
    success: true,
    message: "success, check your email for reset password",
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
  const { password, conf_password } = req.body;

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

  const hasPassword = await argon.hash(password);

  await user.update({
    password: hasPassword,
  });

  return res.status(201).json({
    success: true,
    message: "reset password successed",
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
  sendEmailReset,
  getTokenReset,
  resetPassword,
  logout,
};
