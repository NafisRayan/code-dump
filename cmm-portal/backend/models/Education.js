const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    highSchoolName: String,
    grade: String,
    unweightedGPA: Number,
    previousTestScores: [{
        testName: String,
        score: Number
    }],
    topUniversitiesDesired: [String],
    possibleMajor: String,
    graduationYear: Number
}, { timestamps: true });

module.exports = mongoose.models?.Education || mongoose.model("Education", educationSchema);


const educatima = {
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    currentSchool: {
        type: String,
        required: [true, 'Current school is required']
    },
    intendedSchool: {
        type: String,
        required: [true, 'Intended school is required']
    },
    grade: {
        type: String,
        required: [true, 'Grade is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1900, 'Year must be later than 1900'], // Example validation
        max: [new Date().getFullYear(), 'Year cannot be in the future']
    },
    expectedGraduationYear: {
        type: Number,
        required: [true, 'Expected graduation year is required'],
        min: [1900, 'Expected graduation year must be later than 1900'], // Example validation
        max: [new Date().getFullYear() + 10, 'Expected graduation year cannot be more than 10 years in the future']
    }
}