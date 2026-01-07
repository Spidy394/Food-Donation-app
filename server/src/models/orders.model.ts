import mongoose, { Schema } from "mongoose";

const OrderSchema: Schema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },

    listingId: {
        type: Schema.Types.ObjectId,
        ref: "FoodListing",
    },

    donorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    pickupLocation: {
        type: String,
        required: true,
    },

    pickupTime: {
        type: Date,
        required: true,
    },

    deliveryRoute: {
        type: [String],
    },

    status: {
        type: String,
        enum: ["pending", "in-progress", "completed", "cancelled"],
    },

    qrCode: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const Order = mongoose.model("Order", OrderSchema);