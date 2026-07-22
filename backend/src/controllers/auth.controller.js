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
  const { uuid } = req.params;

  const result = await userModel.findOne({
    where: {
      uuid: uuid,
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

  await result.update({
    verification_token: token,
  });

  const link_reset = `${process.env.LINK_FRONTEND}/reset/${token}`;

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
    from: '"Vote-Application" <sekretariat_kopkarla@kopkarla.co.id>',
    to: result?.email,
    subject: "Verifikasi Akun Aplikasi Kopkarla",
    html: `<!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <title>Verifikasi Akun</title>
            </head>

            <body style="margin:0;padding:30px;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#333333;line-height:1.7;">

            <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
            <td align="center">

            <table width="600" cellpadding="0" cellspacing="0" border="0"
            style="background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">

                <!-- Header -->
                <tr>
                    <td align="between"
                        style="background:#2563eb;padding:25px 20px;color:#ffffff;">

                        <h2 style="margin:0;font-size:22px;font-weight:bold;">
                            Verifikasi Akun
                        </h2>

                        <div style="margin-top:8px;font-size:13px;">
                            Aplikasi Pemilihan Pengawas dan Pengurus Koperasi
                        </div>

                    </td>
                </tr>

                <!-- Content -->
                <tr>
                    <td align="left" style="padding:35px;">

                        <p style="margin-top:0;">
                            Yth. <strong>${result.name}</strong>,
                        </p>

                        <p>
                            Anda terdaftar sebagai <strong>anggota koperasi</strong> yang memiliki hak untuk mengikuti
                            <strong>Pemilihan Pengawas dan Pengurus Koperasi</strong>.
                        </p>

                        <p>
                            Sebelum menggunakan aplikasi, Anda perlu melakukan
                            <strong>verifikasi akun</strong> terlebih dahulu agar akun dapat diaktifkan.
                        </p>

                        <p>
                            Silakan klik tombol berikut untuk verifikasi akun Anda.
                        </p>

                        <!-- Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td align="center" style="padding:20px 0 25px 0;">

                                    <a href="${link_reset}"
                                      style="
                                            background:#2563eb;
                                            color:#ffffff;
                                            text-decoration:none;
                                            display:inline-block;
                                            padding:14px 34px;
                                            border-radius:6px;
                                            font-size:12px;
                                            font-weight:bold;
                                      ">
                                        Verifikasi Akun
                                    </a>

                                </td>
                            </tr>
                        </table>

                        <p>
                            Apabila tombol di atas tidak dapat digunakan, silakan salin dan buka tautan berikut melalui browser:
                        </p>

                        <p style="word-break:break-all;">
                            <a href="${link_reset}" style="color:#2563eb;text-decoration:none;">
                                ${link_reset}
                            </a>
                        </p>

                        <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;">

                        <p>
                            Setelah proses verifikasi berhasil, akun Anda akan aktif dan dapat digunakan untuk:
                        </p>

                        <ul style="padding-left:18px;">
                            <li>Masuk ke aplikasi.</li>
                            <li>Melihat profil calon Pengawas dan Pengurus.</li>
                            <li>Mengikuti proses pemungutan suara sesuai jadwal yang telah ditetapkan.</li>
                            <li>Melihat riwayat pemungutan suara setelah proses selesai.</li>
                        </ul>

                        <p>
                            Demi keamanan akun, mohon untuk tidak membagikan tautan verifikasi ini kepada siapa pun.
                        </p>

                        <p>
                            Jika Anda merasa tidak berhak menerima email ini atau terdapat kesalahan data,
                            silakan menghubungi Kami.
                        </p>

                        <br>

                        <p style="margin-bottom:0;">
                            Hormat kami,
                        </p>

                        <p style="margin-top:5px;">
                            <strong>KOPKARLA</strong>
                        </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="left" style="
                        background:#f8f9fa;
                        text-align:center;
                        padding:18px;
                        font-size:11px;
                        color:#777777;
                    ">
                        Email ini dikirim secara otomatis oleh sistem Aplikasi Pemilihan Pengawas dan Pengurus Koperasi.
                        <br>
                        Mohon untuk tidak membalas email ini.
                    </td>
                </tr>

            </table>

            </td>
            </tr>
            </table>

            </body>
            </html>
            `,
  };

  await transporter.sendMail(emailMessage);

  return res.status(200).json({
    success: true,
    message: "success, check your email for reset password",
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
    throw new CustomHttpError("user not found", 404);
  }

  const token = jwt.sign({ uuid: result.uuid }, process.env.JWT_SECRET, {
    expiresIn: "60m",
  });

  const link_reset = `${process.env.LINK_FRONTEND}/reset/${token}`;

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
    from: '"Vote-Application" <sekretariat_kopkarla@kopkarla.co.id>',
    to: result?.email,
    subject: "Reset Password Aplikasi Kopkarla",
    html: `<!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <title>Reset Password</title>
            </head>

            <body style="margin:0;padding:30px;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#333333;line-height:1.7;">

            <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
            <td align="center">

            <table width="600" cellpadding="0" cellspacing="0" border="0"
            style="background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">

                <!-- Header -->
                <tr>
                    <td align="between"
                        style="background:#2563eb;padding:25px 20px;color:#ffffff;">

                        <h2 style="margin:0;font-size:22px;font-weight:bold;">
                            Reset Password
                        </h2>

                        <div style="margin-top:8px;font-size:13px;">
                            Aplikasi Pemilihan Pengawas dan Pengurus Koperasi
                        </div>

                    </td>
                </tr>

                <!-- Content -->
                <tr>
                    <td align="left" style="padding:35px;">

                        <p style="margin-top:0;">
                            Yth. <strong>${result.name}</strong>,
                        </p>


                        <p>
                            Silakan klik tombol berikut untuk reset password akun Anda.
                        </p>

                        <!-- Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td align="center" style="padding:20px 0 25px 0;">

                                    <a href="${link_reset}"
                                      style="
                                            background:#2563eb;
                                            color:#ffffff;
                                            text-decoration:none;
                                            display:inline-block;
                                            padding:14px 34px;
                                            border-radius:6px;
                                            font-size:12px;
                                            font-weight:bold;
                                      ">
                                        Reset Password
                                    </a>

                                </td>
                            </tr>
                        </table>

                        <p>
                            Apabila tombol di atas tidak dapat digunakan, silakan salin dan buka tautan berikut melalui browser:
                        </p>

                        <p style="word-break:break-all;">
                            <a href="${link_reset}" style="color:#2563eb;text-decoration:none;">
                                ${link_reset}
                            </a>
                        </p>

                        <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;">

                        <p>
                            Demi keamanan akun, mohon untuk tidak membagikan tautan reset password ini kepada siapa pun.
                        </p>

                        <p>
                            Jika Anda merasa tidak berhak menerima email ini atau terdapat kesalahan data,
                            silakan menghubungi Kami.
                        </p>

                        <br>

                        <p style="margin-bottom:0;">
                            Hormat kami,
                        </p>

                        <p style="margin-top:5px;">
                            <strong>KOPKARLA</strong>
                        </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="left" style="
                        background:#f8f9fa;
                        text-align:center;
                        padding:18px;
                        font-size:11px;
                        color:#777777;
                    ">
                        Email ini dikirim secara otomatis oleh sistem Aplikasi Pemilihan Pengawas dan Pengurus Koperasi.
                        <br>
                        Mohon untuk tidak membalas email ini.
                    </td>
                </tr>

            </table>

            </td>
            </tr>
            </table>

            </body>
            </html>
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
    verification_token: null,
    is_verified: 1,
  });

  return res.status(201).json({
    success: true,
    message: "Reset password successed, login with your new password",
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
  sendRequestEmailReset,
  getTokenReset,
  resetPassword,
  logout,
};
