import mongoose, { models } from "mongoose";

const studentSchema = new mongoose.Schema({
    fullName: String,
    gender: String,
    dateOfBirth: Date,
    contactInfo: {
        email: String,
        phone: String
    },
    password: String,
    address: {
        state: String,
        city: String,
        zipCode: String
    },
    emergencyContactNumber: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    },
    education: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Education'
    },
    role: {
        type: String,
        default: 'student'
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Student = models?.Student || mongoose.model("Student", studentSchema);

export default Student;