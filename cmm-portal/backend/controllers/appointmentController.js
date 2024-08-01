const Appointment = require("../models/Appointment.js");
const Client = require("../models/Client.js");
const Employee = require("../models/Employee.js");
const User = require("../models/User.js");

// remove user field (fix later) and exclude "" and null fields
function validateAndClean(obj) {
  delete obj.user;

  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) {
      delete obj[key];
    }
  }

  return obj;
}
exports.getAppointments = async (req, res) => {
  try {
    // make it compatible for frontend table
    // const appointments = await Appointment.aggregate([
    //   {
    //     $unwind: "$client"
    //   },
    //   {
    //     $lookup: {
    //       from: "clients",
    //       localField: "client",
    //       foreignField: "_id",
    //       as: "clients"
    //     }
    //   },
    //   {
    //     $addFields: {
    //       clients: {
    //         $map: {
    //           input: "$clients",
    //           as: "client",
    //           in: {
    //             _id: "$$client._id",
    //             name: "$$client.firstName" // Adjust to the actual field in your clients collection
    //           }
    //         }
    //       }
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "employees",
    //       localField: "tutor",
    //       foreignField: "_id",
    //       as: "tutors"
    //     }
    //   },
    //   {
    //     $addFields: {
    //       tutorName: { $arrayElemAt: ["$tutors.firstName", 0] }
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       date: { $first: "$date" },
    //       service: { $first: "$service" },
    //       duration: { $first: "$duration" },
    //       status: { $first: "$status" },
    //       note: { $first: "$note" },
    //       tutor: { $first: "$tutor" }, 
    //       tutorName: { $first: "$tutorName" },
    //       clients: { $push: { $arrayElemAt: ["$clients", 0] } } 
    //     }
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       date: 1,
    //       service: 1,
    //       duration: 1,
    //       status: 1,
    //       note: 1,
    //       tutor: 1,
    //       tutorName: 1,
    //       clients: 1
    //     }
    //   }
    // ]
    // );
    const appointments = await Appointment.aggregate([
      {
        "$unwind": "$client"
      },
      {
        "$lookup": {
          "from": "clients",
          "localField": "client",
          "foreignField": "_id",
          "as": "clients"
        }
      },
      {
        "$addFields": {
          "clients": {
            "$map": {
              "input": "$clients",
              "as": "client",
              "in": {
                "name": "$$client.firstName" // Adjust to the actual field in your clients collection
              }
            }
          }
        }
      },
      {
        "$lookup": {
          "from": "employees",
          "localField": "tutor",
          "foreignField": "_id",
          "as": "tutors"
        }
      },
      {
        "$addFields": {
          "tutorName": { "$arrayElemAt": ["$tutors.firstName", 0] }
        }
      },
      {
        "$group": {
          "_id": "$_id",
          "date": { "$first": "$date" },
          "service": { "$first": "$service" },
          "duration": { "$first": "$duration" },
          "status": { "$first": "$status" },
          "note": { "$first": "$note" },
          "tutor": { "$first": "$tutor" },
          "tutorName": { "$first": "$tutorName" },
          "clients": {
            "$push": {
              "$arrayElemAt": ["$clients.name", 0]
            }
          }
        }
      },
      {
        "$addFields": {
          "clients": {
            "$reduce": {
              "input": "$clients",
              "initialValue": "",
              "in": {
                "$cond": [
                  { "$eq": ["$$value", ""] },
                  "$$this",
                  { "$concat": ["$$value", ", ", "$$this"] }
                ]
              }
            }
          }
        }
      },
      {
        "$project": {
          "_id": 1,
          "date": 1,
          "service": 1,
          "duration": 1,
          "status": 1,
          "note": 1,
          "tutor": 1,
          "tutorName": 1,
          "clients": 1
        }
      }
    ]

    );

    
    // test
    // [
    //   {
    //     "$unwind": "$client"
    //   },
    //   {
    //     "$lookup": {
    //       "from": "clients",
    //       "localField": "client",
    //       "foreignField": "_id",
    //       "as": "clients"
    //     }
    //   },
    //   {
    //     "$addFields": {
    //       "clients": {
    //         "$map": {
    //           "input": "$clients",
    //           "as": "client",
    //           "in": {
    //             "name": "$$client.firstName" // Adjust to the actual field in your clients collection
    //           }
    //         }
    //       }
    //     }
    //   },
    //   {
    //     "$lookup": {
    //       "from": "employees",
    //       "localField": "tutor",
    //       "foreignField": "_id",
    //       "as": "tutors"
    //     }
    //   },
    //   {
    //     "$addFields": {
    //       "tutorName": { "$arrayElemAt": ["$tutors.firstName", 0] }
    //     }
    //   },
    //   {
    //     "$group": {
    //       "_id": "$_id",
    //       "date": { "$first": "$date" },
    //       "service": { "$first": "$service" },
    //       "duration": { "$first": "$duration" },
    //       "status": { "$first": "$status" },
    //       "note": { "$first": "$note" },
    //       "tutor": { "$first": "$tutor" },
    //       "tutorName": { "$first": "$tutorName" },
    //       "clients": {
    //         "$push": {
    //           "$arrayElemAt": ["$clients.name", 0]
    //         }
    //       }
    //     }
    //   },
    //   {
    //     "$project": {
    //       "_id": 1,
    //       "clients": 1
    //     }
    //   }
    // ]
    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully!",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
exports.getAppointmentsClients = async (req, res) => {
  try {
    const appointments = await Appointment.aggregate(
      [
        {
          "$unwind": "$client"
        },
        {
          "$lookup": {
            "from": "clients",
            "localField": "client",
            "foreignField": "_id",
            "as": "clients"
          }
        },
        {
          "$addFields": {
            "clients": {
              "$map": {
                "input": "$clients",
                "as": "client",
                "in": {
                  "name": "$$client.firstName" // Adjust to the actual field in your clients collection
                }
              }
            }
          }
        },
        {
          "$lookup": {
            "from": "employees",
            "localField": "tutor",
            "foreignField": "_id",
            "as": "tutors"
          }
        },
        {
          "$addFields": {
            "tutorName": { "$arrayElemAt": ["$tutors.firstName", 0] }
          }
        },
        {
          "$group": {
            "_id": "$_id",
            "date": { "$first": "$date" },
            "service": { "$first": "$service" },
            "duration": { "$first": "$duration" },
            "status": { "$first": "$status" },
            "note": { "$first": "$note" },
            "tutor": { "$first": "$tutor" },
            "tutorName": { "$first": "$tutorName" },
            "clients": {
              "$push": {
                "$arrayElemAt": ["$clients.name", 0]
              }
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "date" :1,
            "clients": 1,
            "tutor": 1,
            "tutorName": 1
          }
        }
      ]
    );

    
    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully!",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { appointment, selectedClientIds } = req.body;
    const { date, service, subservice, status, note, tutor, time, duration, client } = appointment

    if (
      [date, service, subservice, status, note, tutor, time, duration].some(
        (field) => field?.trim() === "",
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "All feilds are requried!",
        data: [],
      });
    }
    if (
      selectedClientIds.length <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Atleast one client required!",
        data: [],
      });
    }

    // const foundUser = await User.findById(user);
    // if (!foundUser) {
    //     return res.status(400).json({ error: "Invalid user specified." });
    // }

    const foundTutor = await Employee.findById(tutor);
    if (!foundTutor) {
      return res.status(400).json({ error: "Invalid tutor specified." });
    }
    const foundClients = await Client.find({ _id: { $in: selectedClientIds } });
    if (!foundClients) {
      return res.status(400).json({ error: "Invalid clients specified." });
    }

    // convert date to isoform
    const dateObject = new Date(date);
    const isoDate = dateObject.toISOString();

    // find time in database
    const duplicateTime = await Appointment.findOne({ time });

    // it is not possible to have same date and time for different appointments
    if (duplicateTime?.date.toISOString() === isoDate) {
      return res.status(400).json({
        success: false,
        message: "Date and Time already exist!",
        data: [],
      });
    }

    const newAppointment = new Appointment({
      date,
      service,
      subservice,
      status,
      note,
      tutor,
      client: selectedClientIds,
      time,
      duration,
    });

    const savedAppointment = await newAppointment.save();

    if (!savedAppointment) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating appointment! !",
        data: [],
      });
    }

    res.status(201).json({
      success: true,
      message: "Appointment created successfully!",
      data: savedAppointment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { appointment, selectedClientIds } = req.body;
    // const { date, service, subservice, status, note, tutor, time, duration, client } = appointment
    const data = validateAndClean(appointment);

    const updatedData = { ...data, client: selectedClientIds };
    console.log(updatedData);

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true },
    );

    if (!updatedAppointment) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while updating appointment!",
        data: updatedAppointment,
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully!",
      data: updatedAppointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    // const user = await User.findOne({ _id: req.params.userId })
    // if (!user) {
    //     return res.status(400).json({ error: "User not found." });
    // }

    const updatedAppointmentStatus = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );

    if (!updatedAppointmentStatus) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while updating appointment status!",
        data: [],
      });
    }

    // res.status(200).json(updatedAppointmentStatus);
    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully!",
      data: updatedAppointmentStatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.updateAppointmentNote = async (req, res) => {
  try {
    // const user = await User.findOne({ _id: req.params.userId })
    // if (!user) {
    //     return res.status(400).json({ error: "User not found." });
    // }

    const updatedAppointmentNote = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );

    if (!updatedAppointmentNote) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while updating appointment note!",
        data: [],
      });
    }

    // res.status(200).json(updatedAppointmentStatus);
    res.status(200).json({
      success: true,
      message: "Appointment Note updated successfully!",
      data: updatedAppointmentNote,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.deleteAppointments = async (req, res) => {
  try {
    const arrayOfIds = req.body;
    const deletedAppointments = await Appointment.deleteMany({
      _id: { $in: arrayOfIds },
    });

    if (!deletedAppointments) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while deleting appointments!",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "All selected appointments has been deleted!",
      data: [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
