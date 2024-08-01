const User = require("../models/User");

exports.getHome = (req, res) => {
  // res all the user data form the database form users collection
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json(err);
    });

  // res.send("Hello from home controller");
};
