const nodemailer = require("nodemailer");
const { email_queue: emailQueueModel, sequelize } = require("../models");

const processEmailQueue = async () => {
  const emails = await emailQueueModel.findAll({
    where: {
      status: "pending",
    },
    limit: 20,
  });

  transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  for (const email of emails) {
    try {
      await email.update({
        status: "processing",
      });

      await transporter.sendMail({
        from: '"Vote-Application" <sekretariat_kopkarla@kopkarla.co.id>',
        to: email.to,
        cc: email.cc,
        bcc: email.bcc,
        subject: email.subject,
        html: email.body,
      });

      await email.update({
        status: "sent",
        sent_at: new Date(),
        error_message: null,
      });
    } catch (err) {
      await email.update({
        status: "failed",
        retry_count: email.retry_count + 1,
        error_message: err.message,
      });
    }
  }
};

module.exports = processEmailQueue;
