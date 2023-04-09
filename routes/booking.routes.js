const router = require("express").Router();
const mongoose = require("mongoose")

const Booking = require('../models/Booking.model')
const User = require('../models/User.model')
const Expert = require('../models/Expert.model')

//  POST /api/get-support  -  Creates a new booking for the user
router.post("/get-support", (req, res, next) => {
  let bookingGlobal
    const {description, reasonWhy, user, expert, isOnline, isConfirmed, rating, image } = req.body;
  
    Booking.create({ description, reasonWhy, user, expert, isOnline, isConfirmed, rating, image })
      .then((response) => {
        bookingGlobal = response._id
        return (
          User.findByIdAndUpdate(user, {$push:{bookings:bookingGlobal}})
        )
      }
      )
      .then((response)=>{
        console.log('Response after pushing the booking to user', response)
        return (Expert.findByIdAndUpdate(expert, {$push:{booking:bookingGlobal}}))

      })
      .then((response) => {
        res.json(response)
        console.log(response)
      })
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
router.get("/get-support/:id", (req, res, next) => {
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

  //  GET /api/get-support/edit/:id -  GEts the specific booking by Id and edit
// router.get("/get-support/edit/:id", (req, res, next) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }

//   Booking.findById(id)
//     .populate("user")
//     .populate("expert")
//     .then((booking) => res.status(200).json(booking))
//     .catch((err) => res.json(err));
// });
  
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