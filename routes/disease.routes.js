const router = require("express").Router();
const Disease = require('../models/Disease.model')
const Plant = require('../models/Plant.model')

router.get("/disease", (req, res, next) => {
  
    Disease.find()
      .populate("hosts")
      .then((disease) => res.json(disease))
      .catch((err) => res.json(err));
  });

//  GET /api/disease/:id -  GEts the specific disease by Id
router.get("/disease/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified disease id is not valid" });
    return;
  }

  Disease.findById(id)
    .populate("hosts")
    .then((disease) => res.status(200).json(disease))
    .catch((err) => res.json(err));
});  

//  POST /api/disease  -  Creates a new disease with relationship to plant for the user
router.post("/disease", (req, res, next) => {
 const {name, symptoms, treatment, recoveryTime, isContagious, supplements, image } = req.body;
 
  Disease.create({ name, symptoms, treatment, recoveryTime, isContagious, supplements, image })
      .then((response) => {
        res.json(response)
      }
      )
     .catch((err) => res.json(err));
  });

  module.exports = router;