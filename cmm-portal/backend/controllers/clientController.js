const Client = require("../models/Client.js");
const mongoose = require('mongoose');

exports.getClient = async (req, res) => {
  try {
    const client = await Client.find({}).select(
      "-role -lastName -password -email -updatedAt -createdAt",
    );
    if (!client) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching client!",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "client fetched successfully!",
      data: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields!",
        data: [],
      });
    }

    const client = await Client.create({
      firstName,
      lastName,
      email,
      phoneNumber
      // password,
      // role,
    });

    if (!client) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating client!",
        data: [],
      });
    }

    res.status(201).json({
      success: true,
      message: "client created successfully!",
      data: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.getClientsWithEmployees = async(req,res) => {
  try {
    const data = await Client.aggregate(
        [
          {
            "$match": {
              "_id": new mongoose.Types.ObjectId(`${req.params.id}`)
            }
          }
          , {
            $lookup: {
              from: "appointments",
              let: { clientId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: { $in: ["$$clientId", "$client"] }
                  }
                }
              ],
              as: "matchingAppointments"
            }
          },
          {
            $unwind: "$matchingAppointments"
          },
          {
            $group: {
              _id: null,
              tutors: { $push: "$matchingAppointments.tutor" }
            }
          },
          {
            $lookup: {
              from: "employees",
              localField: "tutors",
              foreignField: "_id",
              as: "tutorDetails"
            }
          },
          {
            $unwind: "$tutorDetails"
          },
          {
            $project: {
              _id: "$tutorDetails._id",
              firstName: "$tutorDetails.firstName"
            }
          },
          {
            $group: {
              _id: null,
              tutors: { $push: { _id: "$_id", firstName: "$firstName" } }
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