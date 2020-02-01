const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    user1:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user2:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    validationUser1: {
        type: String,
        enum: ['like', 'pass', null],
        default: null
    },
    validationUser2: {
        type: String,
        enum: ['like', 'pass', null],
        default: null
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id
            delete ret._id
            delete ret.__v
            return ret
        }
    }
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match