const router = require("express").Router();
const mongoose = require("mongoose")
const Plant = require('../models/Plant.model')
const User = require('../models/User.model')
const fileUploader = require("../config/cloudinary.config");

//  POST /api/plants  -  Creates a new plant for the user
router.post("/plants", (req, res, next) => {
  let plantGlobal 


    const {common_name, watering, imageAPI, nickname, sunlightPositioning, image, plantHeight, birthDate, currentCondition, apiId, user, disease } = req.body;
  
    Plant.create({ common_name, watering, imageAPI, nickname, sunlightPositioning, image, plantHeight, birthDate, currentCondition, apiId, user, disease })
      .then((response) => {
        plantGlobal = response._id
        return User.findByIdAndUpdate(user, {$push:{myPlants:plantGlobal}})
        
      }
     )
     .then((response) => {
      res.json(response)
     })

      .catch((err) => res.json(err));
  });

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});


// GET plants  
router.get("/plants", (req, res, next) => {
  
    Plant.find()
    //   .populate("user")
      .populate("disease")
      .then((plants) => res.json(plants))

      .catch((err) => res.json(err));
  });


//  GET /api/plants/:plantId -  GEts the specific plant by plantId
router.get("/plants/:plantId", (req, res, next) => {
    const { plantId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(plantId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Plant.findById(plantId)
    .populate("user")
    .populate("disease")
      .then((plant) => res.status(200).json(plant))
      .catch((err) => res.json(err));
  });
  
  // PUT  /api/plants/:plantId  -  Edit one plant by Id
  router.put("/plants/:plantId", (req, res, next) => {
    const { plantId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(plantId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Plant.findByIdAndUpdate(plantId, req.body, { new: true })
      .then((editedPlant) => res.json(editedPlant))
      .catch((err) => res.json(err));
  });

  
  
  // DELETE  /api/plants/:plantId  -  Deletes a plant by id
  router.delete("/plants/:plantId", (req, res, next) => {
    const { plantId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(plantId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Plant.findByIdAndRemove(plantId)
      .then(() =>
        res.json({
          message: `Plant with ID(${plantId}) is deleted.`,
        })
      )
      .catch((err) => res.json(err));
  });
  
module.exports = router;