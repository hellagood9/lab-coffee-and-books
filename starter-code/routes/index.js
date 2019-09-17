const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

const placesRoutes = require('./places');
router.use('/', placesRoutes);

module.exports = router;
