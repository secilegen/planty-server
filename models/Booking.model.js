const { Schema, model } = require("mongoose");

const bookingSchema = new Schema (
{
    description: {
    type: String
    },
    
    reasonWhy: {
    type: String,
    enum: ['Plant Positioning', 'Support with Disease', 'Plant Concept']
    },
    
    user: {
    type: Schema.Types.ObjectId,
     ref: "User"
    },
    
    expert: {
    type: Schema.Types.ObjectId,
     ref: "Expert"
    },
    
    
    isOnline: {
    type: String,
    required: [true, "Please select the location: online or face-to-face"],
    enum: ["Online", "Offline"]

    },
    
    date: {
    type: String,
    required: [true, "Please select the date"],
    },

    isConfirmed: {
    type: String,
    enum: ["pending", "accepted", "rejected"]
    },
    
    rating: {
    type: Number
    },

   
    
    }
)
const Booking = model("Booking", bookingSchema);

module.exports = Booking;