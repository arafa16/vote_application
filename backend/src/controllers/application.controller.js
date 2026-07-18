const { application: applicationModel } = require("../models/index.js");
const { Op } = require("sequelize");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const CustomHttpError = require("../utils/custom_http_error.js");

const getDatas = async (req, res) => {
  const { uuid, name, sequence, code, sort } = req.query;

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

  const findDatas = await applicationModel.findAll({
    where,
    order,
  });

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
  const { rows, count } = await applicationModel.findAndCountAll({
    where: whereClause,
    order,
    limit,
    offset,
  });

  const pages = Math.ceil(count / limit);

  return res.status(200).json({
    success: true,
    message: "Get status successfully",
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

  const findData = await applicationModel.findOne({
    where: { uuid },
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

const createData = async (req, res) => {
  const { name, description, sequence } = req.body;

  if (!name || !description || !sequence) {
    throw new CustomHttpError(
      "name, description, and sequence are required",
      400,
    );
  }

  if (!req.files || !req.files.file || req.files.file.length === 0) {
    throw new CustomHttpError("No File Uploaded", 401);
  }

  const file = req.files.file;
  const file_size = file.data.length;
  const file_type = file.mimetype;

  const ext = path.extname(file.name);
  const rename = name ? name + ext : file.name;
  const photo_name = crypto.randomUUID() + ext;
  const photo_url = `/images/${photo_name}`;

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

  file.mv(`./public/images/${photo_name}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    try {
      const application = await applicationModel.create({
        name,
        description,
        logo: photo_name,
        logo_url: photo_url,
        sequence,
      });

      return res.status(201).json({ message: "file uploaded" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

const updateData = async (req, res) => {
  const { uuid } = req.params;
  const { name, description, sequence } = req.body;

  if (!name || !description || !sequence) {
    throw new CustomHttpError(
      "name, description, and sequence are required",
      400,
    );
  }

  const findData = await applicationModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  if (!req.files || !req.files.file || req.files.file.length === 0) {
    const application = await applicationModel.create({
      name,
      description,
      sequence,
    });

    return res.status(201).json({
      status: 201,
      success: true,
      datas: application,
    });
  }

  const file = req.files.file;
  const file_size = file.data.length;
  const file_type = file.mimetype;

  const ext = path.extname(file.name);
  const rename = name ? name + ext : file.name;
  const photo_name = crypto.randomUUID() + ext;
  const photo_url = `/images/${photo_name}`;

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
  if (findData.logo !== null) {
    const filePath = `./public/images/${findData.logo}`;

    const fileExist = fs.existsSync(filePath);

    if (fileExist) {
      fs.unlinkSync(filePath);
    }
  }

  file.mv(`./public/images/${photo_name}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    try {
      const application = await findData.update({
        name,
        description,
        logo: photo_name,
        logo_url: photo_url,
        sequence,
      });

      return res.status(201).json({ message: "file uploaded" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

const deleteData = async (req, res) => {
  const { uuid } = req.params;
  const { permanent } = req.query;

  const findData = await applicationModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  if (Boolean(permanent) === true) {
    //delete foto
    if (findData.logo !== null) {
      const filePath = `./public/images/${findData.logo}`;

      const fileExist = fs.existsSync(filePath);

      if (fileExist) {
        fs.unlinkSync(filePath);
      }
    }
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
  createData,
  updateData,
  deleteData,
};
