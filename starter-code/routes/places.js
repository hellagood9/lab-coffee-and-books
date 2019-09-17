const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

// All places
router.get("/places", (req, res) => {
  Place.find().then(places => {
    res.render("places/places", { places });
  });
});

router.get("/map", (req, res) => {
  Place.find().then(places => {
    res.json( places );
  });
});

// Single place
router.get("/place/:id", (req, res) => {
  Place.findById(req.params.id).then(place => {
    res.render("places/place", { place });
  });
});

// Creates a place
router.get("/places/add", (req, res) => {
  res.render("places/create");
});

router.post("/places/add", (req, res, next) => {
  const { name, type, lat, lng } = req.body;

  const newPlace = {
    name,
    type,
    location: {
      coordinates: [lng, lat],
      type: "Point"
    }
  };

  Place.create(newPlace)
    .then(createdPlace => {
      res.redirect("/places");
    })
    .catch(error => {
      next(error);
      res.redirect("/places/add");
    });
});

// Update a place
router.get("/place/:id/edit", (req, res) => {
  Place.findById(req.params.id).then(place => {
    res.render("places/edit", { place });
  });
});

router.post("/place/:id/edit", (req, res, next) => {
  const { name, type, lat, lng } = req.body;
  const placeToUpdate = {
    name,
    type,
    location: {
      coordinates: [lng, lat]
    }
  };

  Place.findByIdAndUpdate(req.params.id, placeToUpdate, { new: true })
    .then(place => {
      res.redirect("/places");
    })
    .catch(error => next(error));
});

// Delete a place
router.post("/place/:id/delete", (req, res) => {
  Place.findByIdAndDelete(req.params.id)
  .then(deletedPlace => {
    res.redirect("/places");
  })
  .catch(error => {
    next(error);
    res.redirect("/places");
  });
});

module.exports = router;
