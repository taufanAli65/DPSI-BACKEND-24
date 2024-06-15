const express = require('express');
const router = express.Router();
const {Shipper} = require('../models');

router.get('/', async (req, res, next) => {
    try {
      const shipper = await Shipper.findAll();
      res.json(shipper);
    } catch (err) {
      next(err);
    }
});

module.exports = router;