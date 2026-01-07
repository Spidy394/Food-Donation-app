import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },

    orderId: {
        type: Schema.Types.ObjectId,
        ref: "FoodOrder",
        required: true,
    }, 

    donorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    comments: {
        type: String,
        trim: true,
    },

    pointsAwarded: {
        type: Number,
        default: 0,
    }
}, { timestamps: true }); 

export const Feedback = mongoose.model("Feedback", feedbackSchema);