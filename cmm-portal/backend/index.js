const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv");
const app = express();

const homeRoute = require("./routes/home");
const userRoute = require("./routes/user");
const appointmentRoute = require("./routes/appointment");
const employeeRoute = require("./routes/employee");
const advisorRoute = require("./routes/advisor");
const accountabilityCoachRoute = require("./routes/accountabilityCoach.js");
const familySupportManagerRoute = require("./routes/familySupportManager");
const clientRoute = require("./routes/client");
const eventsRoute = require("./routes/events.js")
const sendMailRoute = require("./routes/sendMail");
const registrationRoute = require("./routes/registration");
const createPasswordForNewUser = require("./routes/createPasswordForNewUser");
const schoolRoute = require("./routes/school");

env.config();

const corsAllow = {
  origin: "http://localhost:3000",
  methods: "PUT, GET, POST, PATCH, DELETE, HEAD",
  credentials: true,
};

app.use(cors());
app.use(express.json());

// routes
app.use("/", homeRoute);
app.use("/", userRoute);
app.use("/", appointmentRoute);
app.use("/sendMail", sendMailRoute);
app.use("/registration", registrationRoute);
app.use("/createPasswordForNewUser", createPasswordForNewUser);
app.use("/school", schoolRoute);
app.use("/", employeeRoute);
app.use("/", advisorRoute);
app.use("/", accountabilityCoachRoute);
app.use("/", familySupportManagerRoute);
app.use("/", clientRoute);
app.use("/", eventsRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.log(err));


