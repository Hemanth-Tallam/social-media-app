const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    unique:true
  },
  sex:{
      type:String
  },
  location: {
    type: String,
    required:true
  },
  status: {
    type: String,
  },
  skills: {
    type: [String],
  },
  bio: {
    type: String,
    required:true
  },
  Birthdate: {
    type: Date,
    required:true
  },
  contactNumber:{
      type:Number,
      default:9999999999,
      required:true
  },
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        default: new Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
});

module.exports = mongoose.model('profile', ProfileSchema)