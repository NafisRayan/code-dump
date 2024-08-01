const mongoose = require("mongoose");

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
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
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

module.exports = mongoose.models?.Student || mongoose.model("Student", studentSchema);



const student = {
    fullName: {
        type: String,
        required: [true, 'Full name is required']
      },
      userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true,"Username must be unqiue"], // Ensures the username is unique
        trim: true // Removes whitespace from both ends
      },
      gender: {
        type: String,
        required: [true, 'Gender is required']
      },
      dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
      },
      contactInfo: {
        email: {
          type: String,
          required: [true, 'Email is required'],
          match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Email format validation
          unique: true // Ensures the email is unique
        },
        phone: {
          type: String,
          required: [true, 'Phone number is required'],
        }
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
      },
      address: {
        state: {
          type: String,
          required: [true, 'State is required']
        },
        city: {
          type: String,
          required: [true, 'City is required']
        },
        address: {
          type: String,
          required: [true, 'Address is required']
        }
      },
      communicationPreferences: {
        type: String,
        enum: {
          values: ['sms', 'email', 'app notification'],
          message: 'VALUE is not a valid Valid options are sms, email, app notification.'
        },
        required: [true, 'Communication preference is required']
      },
      referralSource: {
        type: String,
        enum: {
          values: ['facebook', 'youtube', 'tiktok'],
          message: 'VALUE is not valid. Valid options are facebook, youtube, tiktok.'
        },
        required: [true, 'Referral source is required']
      },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
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
};