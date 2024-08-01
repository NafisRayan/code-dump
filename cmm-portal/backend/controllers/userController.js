const User = require("../models/User");

exports.getTutors = async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor" }).select("-password");

    if (!tutors) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching tutors!",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutors fetched successfully!",
      data: tutors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching users!",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
