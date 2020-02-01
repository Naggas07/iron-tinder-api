const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const SALT_FACTOR = 10

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      default: null
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      match: EMAIL_PATTERN,
      default: null
    },
    userName: {
      type: String,
      required: true,
      minlength: 3,
      default: null
    },
    age: {
      type: Number,
      min: 18,
      default: null
    },
    profilePicture: {
      type: String,
      default: null,
      default: null
    },
    gender: {
      type: String,
      enum: ["Male", "Female", null],
      default: null
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    rangeLocation: {
      type: Number,
      default: null
    },
    ageRange: {
      min: {
        type: Number,
        min: 18,
        max: 98,
        default: null
      },
      max: {
        type: Number,
        min: 19,
        max: 99,
        default: null
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
        delete ret.password
        return ret;
      }
    }
  }
);

userSchema.pre('save', function (next) {
    const user = this

    if (user.isModified('password')){
        bcrypt.genSalt(SALT_FACTOR)
        .then(salt => {
            return bcrypt.hash(user.password, salt)
            .then(hash => {
                user.password = hash
                next()
            })
        }).catch(next)
    }else{
        next()
    }
})

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password)
}


const User = mongoose.model('User', userSchema);

module.exports = User
