const {
  user: userModel,
  status: statusModel,
  company: companyModel,
  privilege: privilegeModel,
  sequelize,
} = require("../models");

const CustomHttpError = require("../utils/custom_http_error");
const { Op } = require("sequelize");
const crypto = require("crypto");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");

const importDataUser = async (req, res) => {
  if (!req.files || !req.files.file) {
    throw new CustomHttpError("No file uploaded", 400);
  }

  const { file } = req.files;

  const ext = path.extname(file.name).toLowerCase();

  if (ext !== ".xlsx") {
    throw new CustomHttpError("Only .xlsx file allowed", 400);
  }

  const fileName = `${crypto.randomUUID()}${ext}`;
  const filePath = `./public/assets/imports/${fileName}`;

  await file.mv(filePath);

  const transaction = await sequelize.transaction();

  try {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

    const users = [];

    for (const row of rows) {
      const company = await companyModel.findOne({
        where: {
          name: {
            [Op.like]: `%${row.company}%`,
          },
        },
        transaction,
      });

      if (!company) {
        throw new CustomHttpError(`Company "${row.company}" not found`, 400);
      }

      const status = await statusModel.findOne({
        where: {
          name: row.status,
        },
        transaction,
      });

      if (!status) {
        throw new CustomHttpError(`Status "${row.status}" not found`, 400);
      }

      const emailExist = await userModel.findOne({
        where: {
          email: row.email,
        },
        transaction,
      });

      if (emailExist) {
        throw new CustomHttpError(`Email "${row.email}" already exists`, 400);
      }

      const privilege = await privilegeModel.create(
        {
          name: row.name,
          tata_cara_voting: true,
          profile_kandidat_pengawas: true,
          profile_kandidat_pengurus: true,
          mulai_voting: true,
          riwayat_voting: true,
          dashboard: false,
          status_voting_anggota: false,
          user_data: false,
          setting: false,
          is_active: true,
        },
        { transaction },
      );

      const user = await userModel.create(
        {
          membership_number: row.membership_number,
          name: row.name,
          email: row.email,
          company_id: company.id,
          status_id: status.id,
          privilege_id: privilege.id,
          is_member: row.is_member,
        },
        { transaction },
      );

      users.push(user);
    }

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: `${users.length} users imported successfully`,
      data: users,
    });
  } catch (error) {
    await transaction.rollback();

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

module.exports = {
  importDataUser,
};
