const {
  user: userModel,
  status: statusModel,
  company: companyModel,
  privilege: privilegeModel,
  vote: voteModel,
  audit_log: auditLogModel,
  sequelize,
} = require("../models");
const CustomHttpError = require("../utils/custom_http_error.js");
const argon = require("argon2");

const getDataTable = async (req, res) => {
  const { search, sort } = req.query;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const whereClause = search
    ? {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
        is_active: true,
      }
    : {};

  let order;

  if (sort) {
    sort === "asc"
      ? (order = [["createdAt", "ASC"]])
      : (order = [["createdAt", "DESC"]]);
  } else {
    order = [["name", "ASC"]];
  }

  const { count, rows } = await userModel.findAndCountAll({
    where: whereClause,
    attributes: { exclude: ["id", "password"] },
    limit,
    offset,
    order,
  });

  const pages = Math.ceil(count / limit);

  res.status(200).json({
    success: true,
    message: "success",
    data: {
      total: count,
      users: rows,
      pages: pages,
      page: page,
      limit: limit,
      offset: offset,
    },
  });
};

const getDataById = async (req, res) => {
  const { uuid } = req.params;

  const user = await userModel.findOne({
    where: { uuid },
    include: [
      {
        model: statusModel,
        attributes: ["uuid", "name", "code"],
      },
      {
        model: companyModel,
        attributes: ["uuid", "name"],
      },
      {
        model: privilegeModel,
        attributes: {
          exclude: ["id"],
        },
      },
    ],
    attributes: { exclude: ["id", "password"] },
  });

  if (!user) {
    throw new CustomHttpError("User not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "User data retrieved successfully",
    data: user,
  });
};

const getCreateAttributes = async (req, res) => {
  const status = await statusModel.findAll({
    where: {
      is_active: true,
    },
    attributes: ["uuid", "name", "code"],
  });
  const company = await companyModel.findAll({
    where: {
      is_active: true,
    },
    attributes: ["uuid", "name"],
  });

  return res.status(200).json({
    success: true,
    message: "User data retrieved successfully",
    data: null,
    attributes: {
      status,
      company,
    },
  });
};

const createData = async (req, res) => {
  const {
    membership_number,
    name,
    email,
    password,
    birth_date,
    phone_number,
    status_uuid,
    company_uuid,
    is_member,
  } = req.body;

  const transaction = await sequelize.transaction();

  try {
    if (!membership_number || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let status_id = null;
    if (status_uuid) {
      const findStatus = await statusModel.findOne({
        where: { uuid: status_uuid },
      });
      if (!findStatus) {
        return res.status(404).json({
          success: false,
          message: "User status not found",
        });
      }
      status_id = findStatus.id;
    }

    let company_id = null;
    if (company_uuid) {
      const findCompany = await companyModel.findOne({
        where: { uuid: company_uuid },
      });
      if (!findCompany) {
        return res.status(404).json({
          success: false,
          message: "Company not found",
        });
      }
      company_id = findCompany.id;
    }

    findUser = await userModel.findOne({
      where: {
        email,
      },
    });

    if (findUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await argon.hash(password);

    const user_result = await userModel.create(
      {
        name: name,
        email: email,
        password: hashedPassword,
        membership_number: membership_number,
        birth_date: birth_date,
        phone_number: phone_number,
        status_id,
        company_id,
        is_member: is_member || false,
      },
      { transaction },
    );

    const newPrivilege = await privilegeModel.create(
      {
        user_id: user_result.id,
        name: name,
        voting_page: false,
        dashboard: false,
        user_data: false,
        setting: false,
        is_active: true,
      },
      { transaction },
    );

    user_result.privilege_id = newPrivilege.id;

    await user_result.save({ transaction });

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        uuid: user_result.uuid,
        name: user_result.name,
        email: user_result.email,
        membership_number: user_result.membership_number,
        birth_date: user_result.birth_date,
        phone_number: user_result.phone_number,
        status_id: user_result.status_id,
        company_id: user_result.company_id,
        is_member: user_result.is_member,
        privilege_id: user_result.privilege_id,
      },
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

const getUpdateAttributes = async (req, res, next) => {
  const { uuid } = req.params;

  try {
    const status = await statusModel.findAll({
      where: {
        is_active: true,
      },
      attributes: ["uuid", "name", "code"],
    });
    const company = await companyModel.findAll({
      where: {
        is_active: true,
      },
      attributes: ["uuid", "name"],
    });

    const user = await userModel.findOne({
      where: { uuid },
      include: [
        {
          model: statusModel,
          attributes: ["uuid", "name", "code"],
        },
        {
          model: companyModel,
          attributes: ["uuid", "name"],
        },
        {
          model: privilegeModel,
          attributes: { exclude: ["id"] },
        },
      ],
      attributes: { exclude: ["id", "password"] },
    });

    if (!user) {
      throw new CustomHttpError("User not found", 404);
    }
    return res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      data: user,
      attributes: {
        status,
        company,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateData = async (req, res) => {
  const { uuid } = req.params;
  const {
    membership_number,
    name,
    email,
    password,
    birth_date,
    phone_number,
    status_uuid,
    company_uuid,
    is_member,
  } = req.body;

  const findUser = await userModel.findOne({
    where: { uuid },
    include: [
      {
        model: privilegeModel,
      },
    ],
  });

  if (!findUser) {
    throw new CustomHttpError("User not found", 404);
  }

  let status_id = null;
  if (status_uuid) {
    const findStatus = await statusModel.findOne({
      where: { uuid: status_uuid },
    });
    if (!findStatus) {
      throw new CustomHttpError("User status not found", 404);
    }
    status_id = findStatus.id;
  }

  let company_id = null;
  if (company_uuid) {
    const findCompany = await companyModel.findOne({
      where: { uuid: company_uuid },
    });
    if (!findCompany) {
      throw new CustomHttpError("Company not found", 404);
    }
    company_id = findCompany.id;
  }

  const user_update = await findUser.update({
    membership_number: membership_number || findUser.membership_number,
    name: name || findUser.name,
    email: email || findUser.email,
    password: password ? await argon.hash(password) : findUser.password,
    birth_date: birth_date || findUser.birth_date,
    phone_number: phone_number || findUser.phone_number,
    status_id: status_id || findUser.status_id,
    company_id: company_id || findUser.company_id,
    is_member: is_member !== undefined ? is_member : findUser.is_member,
  });

  return res.status(200).json({
    success: true,
    message: "User data updated successfully",
  });
};

const deleteData = async (req, res) => {
  const { uuid } = req.params;
  const { permanent } = req.query;

  const transaction = await sequelize.transaction();

  try {
    const user = await userModel.findOne({
      where: { uuid },
      transaction,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (Boolean(permanent) === true) {
      await auditLogModel.destroy({
        where: { user_id: user.id },
        transaction,
      });

      await voteModel.destroy({
        where: { user_id: user.id },
        transaction,
      });

      await privilegeModel.destroy({
        where: { id: user.privilege_id },
        transaction,
      });

      await userModel.destroy({
        where: { id: user.id },
        transaction,
      });
    } else {
      await user.update({ is_active: false, status_id: 4 }, { transaction }); // Assuming 4 is the ID for 'deleted' status
    }

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while deleting the user",
    });
  }
};

const changePassword = async (req, res) => {
  const { password, conf_password } = req.body;

  if (password !== conf_password) {
    throw new CustomHttpError("password not match, please check again", 401);
  }

  try {
    const user = await userModel.findOne({
      where: {
        id: req.user.id,
      },
    });

    const hasPassword = await argon.hash(password);

    await user.update({
      password: hasPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Change Password Success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while deleting the user",
    });
  }
};

module.exports = {
  getDataTable,
  getDataById,
  createData,
  getCreateAttributes,
  getUpdateAttributes,
  updateData,
  deleteData,
  changePassword,
};
