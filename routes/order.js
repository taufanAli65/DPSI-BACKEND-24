const express = require('express');
const router = express.Router();
const {Order} = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

//untuk menambah Order baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { customerID, firstName, employeeID, orderDate, shipperID } = req.body;
    const newOrder = await Order.create({ customerID, firstName, employeeID, orderDate, shipperID });
    res.status(201).json(newOrder);
    res.json("Order Added Successfully");
  } catch (err) {
    next(err);
  }
});

//Untuk menampilkan semua Order
router.get('/', authenticate, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

//Memperbarui data Order berdasarkan ID
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { customerID, firstName, employeeID, orderDate, shipperID } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (order) {
      order.customerID = customerID;
      order.firstName = firstName;
      order.employeeID = employeeID;
      order.orderDate = orderDate;
      order.shipperID = shipperID;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ message: 'order Not Found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus order berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.json({ message: 'order deleted' });
    } else {
      res.status(404).json({ message: 'order not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;