const {
  director_candidate: directorCandidateModel,
  voting_period: votingPeriodModel,
} = require("../models/index.js");
const { Op } = require("sequelize");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const CustomHttpError = require("../utils/custom_http_error.js");
const { createLogHandler } = require("./write_log.controller.js");

const getDatas = async (req, res) => {
  const { uuid, name, sort, voting_period_uuid } = req.query;

  const where = {};
  let order = [];

  if (sort) {
    const direction = sort.startsWith("-") ? "DESC" : "ASC";
    const columnName = sort.replace(/^-/, "");
    order.push([columnName, direction]);
  }

  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    };
  }

  if (
    voting_period_uuid !== undefined ||
    voting_period_uuid !== "" ||
    voting_period_uuid !== null
  ) {
    const findVotingPeriod = await votingPeriodModel.findOne({
      where: {
        uuid: voting_period_uuid,
      },
    });

    if (findVotingPeriod) {
      where.voting_period_id = findVotingPeriod.id;
    } else {
      throw new CustomHttpError("periode not found", 404);
    }
  } else {
    throw new CustomHttpError("periode not set", 401);
  }

  const findDatas = await directorCandidateModel.findAll({ where });

  return res.status(200).json({
    success: true,
    message: "success",
    data: findDatas,
  });
};

const getDataTable = async (req, res) => {
  const { search, is_active, sort } = req.query;

  let whereClause = {};
  let order = [];

  if (sort) {
    const direction = sort.startsWith("-") ? "DESC" : "ASC";
    const columnName = sort.replace(/^-/, "");
    order.push([columnName, direction]);
  }

  if (search) {
    whereClause = {
      ...whereClause,
      [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
    };
  }

  if (is_active) {
    whereClause.is_active = is_active;
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;
  const { rows, count } = await directorCandidateModel.findAndCountAll({
    where: whereClause,
    include: [{ model: votingPeriodModel, attributes: { exclude: ["id"] } }],
    attributes: { exclude: ["id"] },
    limit,
    offset,
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

  const findData = await directorCandidateModel.findOne({
    where: { uuid },
    include: [{ model: votingPeriodModel, attributes: { exclude: ["id"] } }],
    attributes: { exclude: ["id"] },
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

const createDataAttributes = async (req, res) => {
  const voting_period = await votingPeriodModel.findAll();

  return res.status(200).json({ message: "success", data: { voting_period } });
};

const createData = async (req, res) => {
  const { voting_period_uuid, name, vision, mission } = req.body;

  if (!voting_period_uuid) {
    throw new CustomHttpError("voting period cannot be null", 400);
  }

  if (!req.files.file || req.files.file.length === 0) {
    throw new CustomHttpError("No File Uploaded", 401);
  }

  const findVotingPeriod = await votingPeriodModel.findOne({
    where: { uuid: voting_period_uuid },
  });

  if (!findVotingPeriod) {
    throw new CustomHttpError("voting period not found", 404);
  }

  const file = req.files.file;
  const file_size = file.data.length;
  const file_type = file.mimetype;

  const ext = path.extname(file.name);
  const rename = name ? name + ext : file.name;
  const photo_name = crypto.randomUUID() + ext;
  const photo_url = `/images/director_candidates/${photo_name}`;

  if (file_size > 50000000) {
    return res.status(422).json({ msg: "Image must be less than 50 MB" });
  }

  const allowed_type = [".png", ".jpg", ".jpeg"];

  //filter file type
  if (!allowed_type.includes(ext.toLowerCase())) {
    return res.status(401).json({
      status: 401,
      success: false,
      datas: {
        data: null,
        message: "type file not allowed",
      },
    });
  }

  file.mv(`./public/images/director_candidates/${photo_name}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    try {
      const director_candidate = await directorCandidateModel.create({
        voting_period_id: findVotingPeriod.id,
        name,
        photo_name,
        photo_url,
        vision,
        mission,
      });

      await createLogHandler({
        user_id: req.user.id,
        activity: "director_candidate-create",
        description: `${req.user.name} has created director candidate ${name}`,
      });

      return res
        .status(201)
        .json({ message: "success", data: director_candidate });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

const updateDataByIdAttributes = async (req, res) => {
  const { uuid } = req.params;
  console.log(uuid);

  const voting_period = await votingPeriodModel.findAll();

  const findData = await directorCandidateModel.findOne({
    where: { uuid },
    include: [{ model: votingPeriodModel, attributes: { exclude: ["id"] } }],
    attributes: { exclude: ["id"] },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "success",
    data: findData,
    attributes: { voting_period },
  });
};

const updateData = async (req, res) => {
  const { uuid } = req.params;
  const { voting_period_uuid, name, vision, mission } = req.body;

  const findData = await directorCandidateModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  if (!voting_period_uuid) {
    throw new CustomHttpError("voting period cannot be null", 400);
  }

  const findVotingPeriod = await votingPeriodModel.findOne({
    where: { uuid: voting_period_uuid },
  });

  if (!findVotingPeriod) {
    throw new CustomHttpError("voting period not found", 404);
  }

  if (!req.files || !req.files.file || req.files.file.length === 0) {
    const director_candidate = await findData.update({
      voting_period_id: findVotingPeriod.id,
      name,
      vision,
      mission,
    });

    await createLogHandler({
      user_id: req.user.id,
      activity: "director_candidate-update",
      description: `${req.user.name} has updated director candidate ${name}`,
    });

    return res.status(201).json({
      status: 201,
      success: true,
      datas: director_candidate,
    });
  }

  const file = req.files.file;
  const file_size = file.data.length;
  const file_type = file.mimetype;

  const ext = path.extname(file.name);
  const rename = name ? name + ext : file.name;
  const photo_name = crypto.randomUUID() + ext;
  const photo_url = `/images/director_candidates/${photo_name}`;

  if (file_size > 50000000) {
    return res.status(422).json({ msg: "Image must be less than 50 MB" });
  }

  const allowed_type = [".png", ".jpg", ".jpeg"];

  //filter file type
  if (!allowed_type.includes(ext.toLowerCase())) {
    return res.status(401).json({
      status: 401,
      success: false,
      datas: {
        data: null,
        message: "type file not allowed",
      },
    });
  }

  //delete foto
  if (findData.photo_name !== null) {
    const filePath = `./public/images/director_candidates/${findData.photo_name}`;

    const fileExist = fs.existsSync(filePath);

    if (fileExist) {
      fs.unlinkSync(filePath);
    }
  }

  file.mv(`./public/images/director_candidates/${photo_name}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    try {
      await findData.update({
        voting_period_id: findVotingPeriod.id,
        name,
        photo_name,
        photo_url,
        vision,
        mission,
      });

      await createLogHandler({
        user_id: req.user.id,
        activity: "director_candidate-update",
        description: `${req.user.name} has updated director candidate ${name}`,
      });

      return res.status(201).json({
        status: 201,
        success: true,
        datas: {
          data: null,
          message: "success",
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: false,
        datas: {
          message: error.message,
        },
      });
    }
  });
};

const deleteData = async (req, res) => {
  const { uuid } = req.params;
  const { permanent } = req.query;

  const findData = await directorCandidateModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  if (Boolean(permanent) === true) {
    //delete foto
    if (findData.photo_name !== null) {
      const filePath = `./public/images/director_candidates/${findData.photo_name}`;

      const fileExist = fs.existsSync(filePath);

      if (fileExist) {
        fs.unlinkSync(filePath);
      }
    }

    await createLogHandler({
      user_id: req.user.id,
      activity: "director_candidate-delete",
      description: `${req.user.name} has deleted director candidate ${findData.name}`,
    });
    await findData.destroy();
  } else {
    await findData.update({
      is_active: false,
    });
  }

  return res.status(200).json({
    success: true,
    message: "data deleted successfully",
  });
};

module.exports = {
  getDatas,
  getDataTable,
  getDataById,
  createDataAttributes,
  updateDataByIdAttributes,
  createData,
  updateData,
  deleteData,
};
