const express = require('express');
const router = express.Router();
const {orderDetail} = require('../models');

router.get('/', async (req, res, next) => {
    try {
      const orderDetail = await OrderDetail.findAll();
      res.json(orderDetail);
    } catch (err) {
      next(err);
    }
});

module.exports = router;