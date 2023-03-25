const router = require("express").Router();
const mongoose = require("mongoose")

const Booking = require('../models/Booking.model')

//  POST /api/get-support  -  Creates a new booking for the user
router.post("/get-support", (req, res, next) => {
    const {description, reasonWhy, user, expert, isOnline, isConfirmed, rating } = req.body;
  
    Booking.create({ description, reasonWhy, user, expert, isOnline, isConfirmed, rating })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

router.get("/get-support", (req, res, next) => {
  
    Booking.find()
      .populate("user")
      .populate("expert")
      .then((allBookings) => res.json(allBookings))
      .catch((err) => res.json(err));
  });


//  GET /api/get-support/:id -  GEts the specific booking by Id
router.get("/get-support/:Id", (req, res, next) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Booking.findById(id)
      .populate("user")
      .populate("expert")
      .then((booking) => res.status(200).json(booking))
      .catch((err) => res.json(err));
  });
  
  // PUT  /api/get-support/:id  -  Edit one booking by Id
  router.put("/get-support/:id", (req, res, next) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Booking.findByIdAndUpdate(id, req.body, { new: true })
      .then((editedBooking) => res.json(editedBooking))
      .catch((err) => res.json(err));
  });
  
  // DELETE  /api/get-support/:id  -  Deletes a booking by id
  router.delete("/get-support/:id", (req, res, next) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Booking.findByIdAndRemove(id)
      .then(() =>
        res.json({
          message: `Booking with ID(${id}) is deleted.`,
        })
      )
      .catch((err) => res.json(err));
  });
  
module.exports = router;