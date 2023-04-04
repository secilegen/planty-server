const router = require("express").Router();
const mongoose = require("mongoose");
const User = require('../models/User.model')
// const Booking = require('../models/Booking.model')
// const Plant = require('../models/Plant.model') 

 //  POST /api/user  -  Creates a new user Question: route /user or /user/:id
 router.post('/user', (req, res, next) => {
    const { email, hashedPassword, isCompany, firstName,lastName, profileImage, companyName, typeOfCompany } = req.body;
   
    User.create({ email, hashedPassword, isCompany, firstName,lastName, profileImage, companyName, typeOfCompany })
      .then(response => {
        console.log('This is the response to user create:', response)
        res.json(response)})
      .catch(err => res.json(err));
  });


//  GET /api/user/:id - Returns user profile

router.get('/user/:id', (req, res, next) => {
    const { id } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Each User has `plants`, `bookings`,  array holding `_id`s of Plants and Bookings documents
    // We use .populate() method to get swap the `_id`s for the actual Task documents
    // Two populates because of two dependencies?
    User.findById(id)
      .populate('myPlants')
      .populate('bookings')
      .then(user => res.status(200).json(user))
      .catch(error => res.json(error));
  });
   
   
  // PUT  /api/user/:id  -  Update/Edit user
  router.put('/user/:id', (req, res, next) => {
    const { id } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    User.findByIdAndUpdate(id, req.body, { new: true })
      .then((updatedUser) => res.json(updatedUser))
      .catch(error => res.json(error));
  });
   
   
  // DELETE  /api/user/:id  -  Deletes user by id
  router.delete('/user/:id', (req, res, next) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    User.findByIdAndRemove(id)
      .then(() => res.json({ message: `Project with ${id} is removed successfully.` }))
      .catch(error => res.json(error));
  });

  module.exports = router ;