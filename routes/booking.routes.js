const router = require("express").Router();
const mongoose = require("mongoose")

const Booking = require('../models/Booking.model')

//  POST /api/bookings  -  Creates a new booking for the user
router.post("/bookings", (req, res, next) => {
    const {description, reasonWhy, user, expert, isOnline, isConfirmed, rating } = req.body;
  
    Booking.create({ description, reasonWhy, user, expert, isOnline, isConfirmed, rating })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

router.get("/bookings", (req, res, next) => {
  
    Booking.find()
      .populate("user")
      .populate("expert")
      .then((allBookings) => res.json(allBookings))
      .catch((err) => res.json(err));
  });


//  GET /api/bookings/:bookingId -  GEts the specific booking by Id
router.get("/bookings/:bookingId", (req, res, next) => {
    const { bookingId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Booking.findById(bookingId)
      .populate("user")
      .populate("expert")
      .then((booking) => res.status(200).json(booking))
      .catch((err) => res.json(err));
  });
  
  // PUT  /api/bookings/:bookingId  -  Edit one booking by Id
  router.put("/bookings/:bookingId", (req, res, next) => {
    const { bookingId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Booking.findByIdAndUpdate(bookingId, req.body, { new: true })
      .then((editedBooking) => res.json(editedBooking))
      .catch((err) => res.json(err));
  });
  
  // DELETE  /api/bookings/:bookingId  -  Deletes a booking by id
  router.delete("/bookings/:bookingId", (req, res, next) => {
    const { bookingId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Booking.findByIdAndRemove(bookingId)
      .then(() =>
        res.json({
          message: `Booking with ID(${bookingId}) is deleted.`,
        })
      )
      .catch((err) => res.json(err));
  });
  
module.exports = router;