const express = require('express');
const router = express.Router();
const {Customer} = require('../models');
const { authenticate } = require('../middleware/auth');

//Untuk menampilkan semua Customer
router.get('/', authenticate, async (req, res, next) => {
    try {
      const customers = await Customer.findAll();
      res.json(customers);
    } catch (err) {
      next(err);
    }
});

//untuk menambah Customer baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const { customerName, contactName, address, city, postalCode, country } = req.body;
      const newCustomer = await Product.create({ customerName, contactName, address, city, postalCode, country });
      res.status(201).json(newCustomer);
      res.json("Customer Added Successfully")
    } catch (err) {
      next(err);
    }
});

//Memperbarui data Customer berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const { customerName, contactName, address, city, postalCode, country } = req.body;
      const customer = await Customer.findByPk(req.params.id);
      if (customer) {
        customer.customerName = customerName;
        customer.contactName = contactName;
        customer.address = address;
        customer.city = city;
        customer.postalCode = postalCode;
        customer.country = country;
        await customer.save();
        res.json(customer);
      } else {
        res.status(404).json({ message: 'Customer Not Found' });
      }
    } catch (err) {
      next(err);
    }
});
  
  // Endpoint untuk menghapus customer berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const customer = await Customer.findByPk(req.params.id);
      if (customer) {
        await customer.destroy();
        res.json({ message: 'Customer deleted' });
      } else {
        res.status(404).json({ message: 'Customer not found' });
      }
    } catch (err) {
      next(err);
    }
  });

module.exports = router;