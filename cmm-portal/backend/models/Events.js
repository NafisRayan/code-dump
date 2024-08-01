const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    zoomLink: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

module.exports = mongoose.models?.Event || mongoose.model("Event", eventSchema);
