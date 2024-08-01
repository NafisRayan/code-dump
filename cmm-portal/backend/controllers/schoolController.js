const School = require("../models/School");

exports.getSchools = (req, res) => {
  School.find()
    .then((schools) => {
      res.status(200).json(schools);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.addSchool = (req, res) => {
  const school = new School({
    name: req.body.name,
    pool: req.body.pool,
  });

  school
    .save()
    .then((school) => {
      res.status(200).json({
        message: "School added successfully",
        id: school.id,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.checkSchool = (req, res) => {
  School.findOne({ _id: req.body.id })
    .then((school) => {
      if (school) {
        res.status(200).json({ id: school._id });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({ message: "School not found!" });
    });
};
