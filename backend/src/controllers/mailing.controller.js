const {
  user: userModel,
  email_queue: emailQueueModel,
  audit_log: auditLogModel,
} = require("../models");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const CustomHttpError = require("../utils/custom_http_error.js");
const { createLogHandler } = require("./write_log.controller.js");

const sendEmailReset = async (req, res) => {
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
    bcc: ["it.dev@kopkarla.co.id"],
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

module.exports = {
  sendEmailReset,
};
