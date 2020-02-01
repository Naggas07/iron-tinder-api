const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      match: EMAIL_PATTERN
    },
    userName: {
      type: String,
      required: true,
      minlength: 3
    },
    age: {
      type: Number,
      min: 18
    },
    profilePicture: {
      type: String,
      default: null
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: undefined
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    description: {
      type: String
    },
    location: {
      type: String
    },
    rangeLocation: {
      type: Number
    },
    ageRange: {
      min: {
        type: Number,
        min: 18,
        max: 98
      },
      max: {
        type: Number,
        min: 19,
        max: 99
      }
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);


const User = mongoose.model('User', userSchema);

module.exports = User
