const router = require("express").Router();
const mongoose = require("mongoose");
const Expert = require('../models/Expert.model')
// const Booking = require('../models/Booking.model')
// const Plant = require('../models/Plant.model') 

 //  POST /api/expert  -  Creates a new expert
 router.post('/expert', (req, res, next) => {
    const { firstName, lastName, email, passwordHash, profileImage, experienceLevel, favoritePlants, availability, isOnline, expertLocation, price } = req.body;
   
    Expert.create({ firstName, lastName, email, passwordHash, profileImage, experienceLevel, favoritePlants, availability, isOnline, expertLocation, price })
      .then(response => res.json(response))
      .catch(err => res.json(err));
  });


//  GET /api/expert/:id - Returns expert profile

router.get('/expert/:id', (req, res, next) => {
    const { id } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Each User has `plants`, `bookings`,  array holding `_id`s of Plants and Bookings documents
    // We use .populate() method to get swap the `_id`s for the actual Task documents
    // Two populates because of two dependencies?
    Expert.findById(id)
      .populate('booking')
      .then(user => res.status(200).json(user))
      .catch(error => res.json(error));
  });
   
   
  // PUT  /api/expert/:id  -  Update/Edit expert
  router.put('/expert/:id', (req, res, next) => {
    const { id } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Expert.findByIdAndUpdate(id, req.body, { new: true })
      .then((updatedUser) => res.json(updatedUser))
      .catch(error => res.json(error));
  });
   
   
  // DELETE  /api/expert/:id  -  Deletes expert by id
  router.delete('/expert/:id', (req, res, next) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Expert.findByIdAndRemove(id)
      .then(() => res.json({ message: `Project with ${id} is removed successfully.` }))
      .catch(error => res.json(error));
  });

  module.exports = router ;