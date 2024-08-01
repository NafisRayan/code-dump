const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Parent = require("../models/Parent");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    const { token, password } = req.body;
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Expired link. Try again." });
      }
      const { email } = decoded;

      const student = await Student.findOne({ "contactInfo.email": email });
      if (!student) {
        const parent = await Parent.findOne({ "contactInfo.email": email });
        if (!parent) {
          return res.status(404).json({ message: "User not found" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        parent.password = hashedPassword;
        await parent.save();
        return res
          .status(200)
          .json({ message: "Password created successfully" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      student.password = hashedPassword;
      await student.save();
      return res.status(200).json({ message: "Password created successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
