const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    service: { type: String, required: true },
    subservice: { type: String, required: true },
    status: { type: String, required: true },
    note: { type: String },
    duration: { type: String },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    }],
    
  },
  { timestamps: true },
);

// Middleware to validate tutor before saving
// AppointmentSchema.pre("save", async function (next) {
//   try {
//     if (this.tutor) {
//       const foundTutor = await User.findById(this.tutor);
//       if (!foundTutor || !foundTutor.isTutor) {
//         throw new Error("Invalid tutor reference");
//       }
//     }
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = mongoose.model("Appointment", AppointmentSchema);
