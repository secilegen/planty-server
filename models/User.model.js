const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    trim: true,
  },
  hashedPassword: {
    type: String,
    required: [true, "Password is required"],
  },

  firstName: {
    type: String,
  },
  
  lastName: {
    type: String,
  },

  image: {
    type: String,
  },

  isExpert: {
    type: Boolean,
    default: false,
  },

  isCompany: {
    type: Boolean,
    required: [true, "User type is required"],
  },

  companyName: {
    type: String,
  },

  typeOfCompany: {
    type: String,
    enum: ["Restaurant", "Café", "Bar", "Hotel", "Office", "Other"],
  },

  myPlants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Plant",
    },
  ],

  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ]
});

const User = model("User", userSchema);

module.exports = User;
