const FamilySupportManager = require("../models/FamilySupportManager.js");

exports.getFamilySupportManager = async (req, res) => {
  try {
    const familySupportManager = await FamilySupportManager.find({});
    if (!familySupportManager) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching familySupportManagers!",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "familySupportManager fetched successfully!",
      data: familySupportManager,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.createFamilySupportManager = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields!",
        data: [],
      });
    }

    const familySupportManager = await FamilySupportManager.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    if (!familySupportManager) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating familySupportManager!",
        data: [],
      });
    }

    res.status(201).json({
      success: true,
      message: "familySupportManager created successfully!",
      data: familySupportManager,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
