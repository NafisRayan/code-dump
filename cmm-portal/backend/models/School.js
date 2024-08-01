const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pool: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.models?.School || mongoose.model("School", schoolSchema);