const router = require("express").Router();

const mongoose = require("mongoose")

const Plant = require('../models/Plant.model')

//  POST /api/plants  -  Creates a new plant for the user
router.post("/plants", (req, res, next) => {
    const {nickname, sunlightPositioning, image, plantHeight, birthDate, currentCondition, apiId, user, disease } = req.body;
  
    Plant.create({ nickname, sunlightPositioning, image, plantHeight, birthDate, currentCondition, apiId, user, disease })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

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
    //   .populate("user")
    //   .populate("disease")
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