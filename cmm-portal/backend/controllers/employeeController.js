const Appointment = require("../models/Appointment.js");
const User = require("../models/User.js");
const Employee = require("../models/Employee.js");
const mongoose = require('mongoose');


exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).select(
      "-password -email -updatedAt -createdAt -location -role -lastName",
    );
    if (!employees) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching employees!",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee fetched successfully!",
      data: employees,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, location } =
      req.body;

    if (!firstName || !lastName || !email || !password || !role || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields!",
        data: [],
      });
    }
    // const isValid =
    //   availability.length > 1 &&
    //   availability.every(
    //     (obj) => obj.hasOwnProperty("date") && obj.hasOwnProperty("times"),
    //   );
    // if (!isValid) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "Date and times format is not valid!",
    //     data: [],
    //   });
    // }

    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      password,
      role,
      location
    });

    if (!employee) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating employee!",
        data: [],
      });
    }

    res.status(201).json({
      success: true,
      message: "Employee created successfully!",
      data: employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
// exports.updateTutors = async (req, res) => {
//   try {
//     const updatedTutor = await Employee.findOneAndUpdate(
//       { _id: req.params.id },
//       { $set: req.body },
//       { new: true },
//     );

//     if (!updatedTutor) {
//       return res.status(500).json({
//         success: true,
//         message: "Something went wrong while updating tutor!",
//         data: [],
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Employee updated successfully!",
//       data: updatedTutor,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message });
//   }
// };
// exports.deleteTutors = async (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message });
//   }
// };

// exports.getMathTutors = async (req, res) => {
//   try {
//     const tutors = await Employee.aggregate([
//       {
//         $match: {
//           subject: "math",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//         },
//       },
//     ]);
//     if (!tutors) {
//       return res.status(500).json({
//         success: false,
//         message: "Something went wrong while fetching tutor!",
//         data: [],
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Employee fetched successfully!",
//       data: tutors,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message });
//   }
// };
// exports.getEnglishTutors = async (req, res) => {
//   try {
//     const tutors = await Employee.aggregate([
//       {
//         $match: {
//           subject: "english",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//         },
//       },
//     ]);
//     if (!tutors) {
//       return res.status(500).json({
//         success: false,
//         message: "Something went wrong while fetching tutor!",
//         data: [],
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Employee fetched successfully!",
//       data: tutors,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message });
//   }
// };


exports.getEmployeesWithClients = async(req,res) => {
  try {
    const data = await Employee.aggregate(
      [
        {
          "$match": {
            "_id": new mongoose.Types.ObjectId(`${req.params.id}`)
          }
        },
         {
          "$lookup": {
            "from": "appointments",
            "localField": "_id",
            "foreignField": "tutor",
            "as": "clientDetails"
          }
        },
        {
          "$project": {
            "clientDetails": {
              "$map": {
                "input": "$clientDetails",
                "as": "appointment",
                "in": "$$appointment.client"
              }
            }
          }
        },
        {
          "$project": {
            "clientDetails": {
              "$reduce": {
                "input": "$clientDetails",
                "initialValue": [],
                "in": { "$setUnion": ["$$value", "$$this"] }
              }
            }
          }
        },
        {
          "$lookup": {
            "from": "clients",
            "localField": "clientDetails",
            "foreignField": "_id",
            "as": "clients"
          }
        },
        {
          "$unwind": "$clients"
        },
        {
          "$project": {
            "_id": 0,
            "clients": {
              "_id": "$clients._id",
              "firstName": "$clients.firstName"
            }
          }
        },
        {
          "$group": {
            "_id": null,
            "clients": {
              "$push": "$clients"
            }
          }
        }
      ]
    );

    
    res.status(200).json({
      success: true,
      message: "Data fetched successfully!",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}