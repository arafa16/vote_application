const { slider: sliderModel } = require("../models/index.js");
const { Op } = require("sequelize");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const CustomHttpError = require("../utils/custom_http_error.js");

const getDatas = async (req, res) => {
  const { page_view, sort, is_active } = req.query;

  const where = {};
  let order = [];

  if (sort) {
    const direction = sort.startsWith("-") ? "DESC" : "ASC";
    const columnName = sort.replace(/^-/, "");
    order.push([columnName, direction]);
  }

  if (is_active) {
    where.is_active = is_active;
  }

  if (page_view) {
    where.page_view = page_view;
  }

  const findDatas = await sliderModel.findAll({
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
  const { rows, count } = await sliderModel.findAndCountAll({
    where: whereClause,
    order,
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

  const findData = await sliderModel.findOne({
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
  const { page_view, sequence } = req.body;

  if (!page_view) {
    throw new CustomHttpError("page view are required", 400);
  }

  if (!req.files || !req.files.file || req.files.file.length === 0) {
    throw new CustomHttpError("No File Uploaded", 401);
  }

  const file = req.files.file;
  const file_size = file.data.length;
  const file_type = file.mimetype;

  const ext = path.extname(file.name);
  const rename = file.name;
  const image_name = crypto.randomUUID() + ext;
  const image_url = `/images/sliders/${image_name}`;

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

  file.mv(`./public/images/sliders/${image_name}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    try {
      const slider = await sliderModel.create({
        image_name: image_name,
        image_url: image_url,
        sequence,
        page_view,
      });

      return res.status(201).json({ message: "file uploaded", data: slider });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

const updateData = async (req, res) => {
  const { page_view, sequence } = req.body;

  if (page_view) {
    throw new CustomHttpError("page view are required", 400);
  }

  const findData = await sliderModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  if (!req.files || !req.files.file || req.files.file.length === 0) {
    const slider = await findData.update({
      page_view,
      sequence,
    });

    return res.status(201).json({
      status: 201,
      success: true,
      datas: slider,
    });
  }

  const file = req.files.file;
  const file_size = file.data.length;
  const file_type = file.mimetype;

  const ext = path.extname(file.name);
  const rename = name ? name + ext : file.name;
  const image_name = crypto.randomUUID() + ext;
  const image_url = `/images/sliders/${image_name}`;

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
    const filePath = `./public/images/sliders/${findData.image_name}`;

    const fileExist = fs.existsSync(filePath);

    if (fileExist) {
      fs.unlinkSync(filePath);
    }
  }

  file.mv(`./public/images/sliders/${image_name}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    try {
      const application = await findData.update({
        image_name: image_name,
        image_url: image_url,
        sequence,
        page_view,
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

  const findData = await sliderModel.findOne({
    where: { uuid },
  });

  if (!findData) {
    throw new CustomHttpError("data not found", 404);
  }

  if (Boolean(permanent) === true) {
    //delete foto
    if (findData.image_name !== null) {
      const filePath = `./public/images/sliders/${findData.image_name}`;

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
