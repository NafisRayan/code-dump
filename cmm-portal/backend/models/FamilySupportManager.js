const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const familySupportManagerSchema = new mongoose.Schema(
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
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

familySupportManagerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports =
  mongoose.models?.FamilySupportManager ||
  mongoose.model("FamilySupportManager", familySupportManagerSchema);
