import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    // firebase UID
    userId: {
        type: String,
        required: true,
        unique: true,
        index: true
    }, 

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },

    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    role: {
        type: String,
        enum: ["donor", "receiver"],
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    city: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    state: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    pinCode: {
        type: Number,
        required: true,
        index: true
    },

    points: {
        type: Number,
        default: 0
    }
       
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);