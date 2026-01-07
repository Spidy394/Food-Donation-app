import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    notificationId: {
        type: String,
        required: true,
        unique: true,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    type: {
        type: String,
        enum: ['new_listing', 'order_claimed', 'order_completed'] 
    },

    message: {
        type: String,
        required: true,
    },

    isRead: {
        type: Boolean,
        default: false,
    },

    metadata: {
        type: Schema.Types.Mixed,
    }
}, { timestamps: true });

export const Notification = mongoose.model("Notification", notificationSchema);