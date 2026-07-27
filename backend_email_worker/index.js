const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

const dotenv = require("dotenv");
const db = require("./src/models/index.js");
const processEmailQueue = require("./src/controllers/send_email.controller.js");

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.LINK_FRONTEND],
  }),
);

app.use(express.json());

cron.schedule("*/30 * * * * *", async () => {
  console.log("Process Email Queue every 30 seconds");
  await processEmailQueue();
});

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`server running at port ${process.env.BACKEND_PORT}`);
});
