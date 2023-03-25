const router = require("express").Router();
const Disease = require('../models/Disease.model')

router.get("/disease", (req, res, next) => {
  
    Disease.find()
    //   .populate("hosts")
      .then((disease) => res.json(disease))
      .catch((err) => res.json(err));
  });

  module.exports = router;