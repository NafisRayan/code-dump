import mongoose, { models } from "mongoose";

const parentSchema = new mongoose.Schema({
    fullName: String,
    gender: String,
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
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    role: {
        type: String,
        default: 'parent'
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Parent = models?.Parent || mongoose.model("Parent", parentSchema);

export default Parent;