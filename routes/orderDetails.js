const express = require('express');
const router = express.Router();
const {OrderDetail} = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

//untuk menambah OrderDetail baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { orderID, productID, quantity } = req.body;
    const newOrderDetail = await OrderDetail.create({ orderID, productID, quantity });
    res.status(201).json(newOrderDetail);
    res.json("OrderDetail Added Successfully")
  } catch (err) {
    next(err);
  }
});

//Untuk menampilkan semua Order
router.get('/', authenticate, async (req, res, next) => {
  try {
    const orderDetails = await OrderDetail.findAll();
    res.json(orderDetails);
  } catch (err) {
    next(err);
  }
});

//Memperbarui data Order berdasarkan ID
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { orderID, productID, quantity } = req.body;
    const orderDetail = await OrderDetail.findByPk(req.params.id);
    if (orderDetail) {
      orderDetail.orderID = orderID;
      orderDetail.productID = productID;
      orderDetail.quantity = quantity;
      await orderDetail.save();
      res.json(orderDetail);
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
    const orderDetail = await OrderDetail.findByPk(req.params.id);
    if (orderDetail) {
      await orderDetail.destroy();
      res.json({ message: 'order deleted' });
    } else {
      res.status(404).json({ message: 'order not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;