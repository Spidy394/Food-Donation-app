import mongoose, { Schema } from "mongoose";

const foodListingSchema = new Schema({
    listingId: {
        type: String,
        required: true,
        unique: true,
    },

    donorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    state: {
        type: String,
        enum: ["raw", "cooked"],
        required: true,
    },

    category: {
        type: String,
        enum: ["vegetarian", "non-vegetarian", "vegan"],
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    images: [{
        type: String,
    }],

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

    expiryTime: {
        type: Date,
        required: true,
    },

    status: {
        type: String,
        enum: ["available", "claimed", "expired"],
        default: "available",
    }
}, { timestamps: true });

export const FoodListing = mongoose.model("FoodListing", foodListingSchema);