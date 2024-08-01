const mongoose = require("mongoose");

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

module.exports = mongoose.models?.Parent || mongoose.model("Parent", parentSchema);


const par = {
    fullName: {
        type: String,
        required: [true, 'Full name is required']
      },
      dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
      },
      userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, "Username must be unique "],
        trim: true 
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
        },
        zip: {
          type: String,
          required: [true, 'Zip code is required'],
        }
      },
      communicationPreferences: {
        type: String,
        enum: {
          values: ['sms', 'email', 'app notification'],
          message: 'Value is not valid. Valid options are sms, email, app notification.'
        },
        required: [true, 'Communication preference is required']
      },
      referralSource: {
        type: String,
        enum: {
          values: ['facebook', 'youtube', 'tiktok'],
          message: 'Value is not valid. Valid options are facebook, youtube, tiktok.'
        },
        required: [true, 'Referral source is required']
      },
      school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: [true, 'School is required']
      },
      parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: [true, 'Parent is required']
      },
      education: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Education',
        required: [true, 'Education is required']
      },
      role: {
        type: String,
        default: 'parent',
        enum: {
          values: ['parent', 'tutor', 'admin', 'advisor', 'family support manager'],
          message: '{VALUE} is not a valid role. Valid roles are parent, tutor, admin, advisor, family support manager.'
        }
      }
}
const staff  = {
    fullName: {
        type: String,
        required: [true, 'Full name is required']
      },
      dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
      },
      userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, "Username must be unique "],
        trim: true 
      },
      contactInfo: {
        email: {
          type: String,
          required: [true, 'Email is required'],
          match: [/.+\@.+\..+/, 'Please fill a valid email address'], 
          unique: true 
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
        },
        zip: {
          type: String,
          required: [true, 'Zip code is required'],
        }
      },
    role: {
        type: String,
        enum: ["tutor","admin", "advisor", "family support manager"],
        message: 'Plz add a valid role, Valid roles are tutor, admin, advisor, family support manager.'
    },
}