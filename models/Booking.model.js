const { Schema, model } = require("mongoose");

const bookingSchema = new Schema (
{
    description: {
    type: String
    },
    
    reasonWhy: {
    type: String
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
    type: Boolean,
    required: [true, "Please select the location: online or face-to-face"]
    },
    
    isConfirmed: {
    type: Boolean,
    },
    
    rating: {
    type: Number
    },
    
    }
)
const Booking = model("Expert", bookingSchema);

module.exports = Booking;