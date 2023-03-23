const { Schema, model } = require("mongoose");

const expertSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Name is required"],
  },

  lastName: {
    type: String,
    required: [true, "Name is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
  },

  profileImage: {
    type: String,
  },

  experienceLevel: {
    type: String,
    required: [true, "Experience level is required"],
    enum: ["1-3 years", "4-6 years", "more than 6 years"],
  },

  favoritePlants: [
    {
      type: String,
    },
  ],

  availability: {
    type: Boolean,
    required: [true, "Availability is required"],
  },

  isOnline: {
    type: Boolean,
    required: [true, "Please select online or offline"],
  },

  expertLocation: {
    type: String,
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
  },

  booking: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});
const Expert = model("Expert", expertSchema);

module.exports = Expert;
