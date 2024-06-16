const express = require('express');
const router = express.Router();
const {Shipper} = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan Shipper baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { shipperName, phone } = req.body;
    const newShipper = await Shipper.create({ shipperName, phone });
    res.status(201).json(newShipper);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua produk
router.get('/', authenticate, async (req, res, next) => {
  try {
    const shippers = await Shipper.findAll();
    res.json(shippers);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan shipper berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const shipper = await Shipper.findByPk(req.params.id);
    if (shipper) {
      res.json(shipper);
    } else {
      res.status(404).json({ message: 'Shipper not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui shipper berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { shipperName, phone } = req.body;
    const shipper = await Shipper.findByPk(req.params.id);
    if (shipper) {
      shipper.shipperName = shipperName;
      shipper.phone = phone;
      await shipper.save();
      res.json(shipper);
    } else {
      res.status(404).json({ message: 'shipper not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus shipper berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const shipper = await Shipper.findByPk(req.params.id);
    if (shipper) {
      await shipper.destroy();
      res.json({ message: 'shipper deleted' });
    } else {
      res.status(404).json({ message: 'shipper not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;