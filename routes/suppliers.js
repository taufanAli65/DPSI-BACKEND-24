const express = require('express');
const router = express.Router();
const {Supplier} = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan supplier baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { supplierName, contactName, address, city, postalCode, country, phone } = req.body;
    const newSupplier = await Supplier.create({ supplierName, contactName, address, city, postalCode, country, phone });
    res.status(201).json(newSupplier);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua supplier
router.get('/', authenticate, async (req, res, next) => {
  try {
    const supplier = await Supplier.findAll();
    res.json(supplier);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan supplier berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui supplier berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { supplierName, contactName, address, city, postalCode, country, phone } = req.body;
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
        supplier.supplierName = supplierName;
        supplier.contactName = contactName;
        supplier.address = address;
        supplier.city = city;
        supplier.postalCode = postalCode;
        supplier.country = country;
        supplier.phone = phone;
      await supplier.save();
      res.json(supplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus supplier berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      await supplier.destroy();
      res.json({ message: 'supplier deleted' });
    } else {
      res.status(404).json({ message: 'supplier not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;