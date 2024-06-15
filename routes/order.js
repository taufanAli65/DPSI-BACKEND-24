const express = require('express');
const router = express.Router();
const {Order} = require('../models');

router.get('/', async (req, res, next) => {
    try {
      const order = await Order.findAll();
      res.json(order);
    } catch (err) {
      next(err);
    }
});

module.exports = router;