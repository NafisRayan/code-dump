const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const clientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

// clientSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return;

//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

module.exports =
  mongoose.models?.Client || mongoose.model("Client", clientSchema);
