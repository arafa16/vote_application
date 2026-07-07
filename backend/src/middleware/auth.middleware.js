const jwt = require("jsonwebtoken");
const {
  user: userModel,
  status: statusModel,
  privilege: privilegeModel,
} = require("../models");
const CustomHttpError = require("../utils/custom_http_error.js");

const verifyToken = async (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "access denied, no token provided",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "access expired, please login again",
      });
    }

    const user = await userModel.findOne({
      where: {
        uuid: decoded.uuid,
      },
      include: [
        {
          model: statusModel,
          attributes: ["name", "code"],
        },
        {
          model: privilegeModel,
          attributes: {
            exclude: ["id", "created_at", "updated_at"],
          },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "login failed, user not found or deleted",
      });
    }

    if (user.status.code !== "2") {
      return res.status(401).json({
        success: false,
        message: `you don't have access, status account is ${user.status.name}`,
      });
    }

    req.user = user;

    next();
  });
};

module.exports = {
  verifyToken,
};
