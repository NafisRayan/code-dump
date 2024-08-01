const AccountabilityCoach = require("../models/AccountabilityCoach.js");

exports.getAccountabilityCoach = async (req, res) => {
  try {
    const accountabilityCoach = await AccountabilityCoach.find({});
    if (!accountabilityCoach) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching accountabilityCoach!",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "accountabilityCoach fetched successfully!",
      data: accountabilityCoach,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.createAccountabilityCoach = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields!",
        data: [],
      });
    }

    const accountabilityCoach = await AccountabilityCoach.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    if (!accountabilityCoach) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating accountabilityCoach!",
        data: [],
      });
    }

    res.status(201).json({
      success: true,
      message: "accountabilityCoach created successfully!",
      data: accountabilityCoach,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
