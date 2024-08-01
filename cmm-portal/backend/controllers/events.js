const Events = require("../models/Events");

exports.getEvents = async (req, res) => {
  try {
    const events = await Events.find({}).select("-description -zoomLink -createdAt -updatedAt")

    if (!events) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching events!",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "events fetched successfully!",
      data: events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.createEvents = async (req, res) => {
  try {
    const { title, description, zoomLink, startTime, endTime, date } = req.body;

    if (!title || !description || !zoomLink || !startTime || !endTime || !date) {

      return res.status(400).json({
        success: false,
        message: "Please provide all fields!",
        data: [],
      });
    }

    const event = await Events.create({
      title,
      description,
      zoomLink,
      start: startTime,
      end: endTime,
      date
    });

    if (!event) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating events!",
        data: [],
      });
    }

    res.status(201).json({
      success: true,
      message: "event created successfully!",
      data: event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};