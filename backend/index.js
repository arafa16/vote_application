const express = require("express");
const cors = require("cors");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const SequelizeStore = require("connect-session-sequelize");

const dotenv = require("dotenv");
const db = require("./src/models/index.js");
const errorHandlerMiddleware = require("./src/middleware/error_handler.js");
const not_found = require("./src/middleware/not_found.js");

const auth_router = require("./src/routes/auth.route.js");
const user_router = require("./src/routes/user.route.js");
const company_router = require("./src/routes/company.route.js");
const status_router = require("./src/routes/status.route.js");
const privilege_router = require("./src/routes/privilege.route.js");
const voting_period_router = require("./src/routes/voting_period.route.js");
const director_candidate_router = require("./src/routes/director_candidate.route.js");
const director_vote_router = require("./src/routes/director_vote.route.js");
const commissioner_candidate_router = require("./src/routes/commissioner_candidate.route.js");
const commissioner_vote_router = require("./src/routes/commissioner_vote.route.js");
const application_router = require("./src/routes/application.route.js");
const audit_log_router = require("./src/routes/audit_log.route.js");
const slider_router = require("./src/routes/slider.route.js");
const status_voting = require("./src/routes/status_voting.route.js");
const mailing = require("./src/routes/mailing.route.js");

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db.sequelize,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
      expires: 1000 * 60 * 60 * process.env.SESS_EXPIRES,
    },
  }),
);

app.use(
  cors({
    credentials: true,
    origin: [process.env.LINK_FRONTEND],
  }),
);

app.use(express.json());
app.use(fileUpload());

//setup public folder
app.use(express.static("public"));

//route
app.use("/api/v1/auth", auth_router);
app.use("/api/v1/user", user_router);
app.use("/api/v1/company", company_router);
app.use("/api/v1/status", status_router);
app.use("/api/v1/privilege", privilege_router);
app.use("/api/v1/voting_period", voting_period_router);
app.use("/api/v1/director_candidate", director_candidate_router);
app.use("/api/v1/director_vote", director_vote_router);
app.use("/api/v1/commissioner_candidate", commissioner_candidate_router);
app.use("/api/v1/commissioner_vote", commissioner_vote_router);
app.use("/api/v1/application", application_router);
app.use("/api/v1/audit_log", audit_log_router);
app.use("/api/v1/slider", slider_router);
app.use("/api/v1/status_voting", status_voting);
app.use("/api/v1/mail", mailing);

//handle errors
app.use(errorHandlerMiddleware);
app.use(not_found);

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`server running at port ${process.env.BACKEND_PORT}`);
});
