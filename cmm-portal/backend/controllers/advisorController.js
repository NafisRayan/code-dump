const Advisor = require("../models/Advisor.js");

exports.getAdvisor = async (req, res) => {
  try {
    const advisor = await Advisor.find({});
    if (!advisor) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching advisor!",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "advisor fetched successfully!",
      data: advisor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.createAdvisor = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields!",
        data: [],
      });
    }

    const advisor = await Advisor.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    if (!advisor) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating Advisor!",
        data: [],
      });
    }

    res.status(201).json({
      success: true,
      message: "Advisor created successfully!",
      data: advisor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
