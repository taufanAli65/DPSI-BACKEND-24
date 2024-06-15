const express = require('express');
const router = express.Router();
const {Employee} = require('../models');

router.get('/', async (req, res, next) => {
    try {
      const employee = await Employee.findAll();
      res.json(employee);
    } catch (err) {
      next(err);
    }
});

module.exports = router;