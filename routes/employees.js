const express = require('express');
const router = express.Router();
const {Employee} = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

//untuk menambah Employee baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { lastName, firstName, birthDate, photo, notes} = req.body;
    const newEmployee = await Employee.create({ lastName, firstName, birthDate, photo, notes });
    res.status(201).json(newEmployee);
    res.json("Employee Added Successfully")
  } catch (err) {
    next(err);
  }
});

//Untuk menampilkan semua Employee
router.get('/', authenticate, async (req, res, next) => {
  try {
    const employee = await Employee.findAll();
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

//Memperbarui data Employee berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { lastName, firstName, birthDate, photo, notes } = req.body;
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      employee.lastName = lastName;
      employee.firstName = firstName;
      employee.birthDate = birthDate;
      employee.photo = photo;
      employee.notes = notes;
      await employee.save();
      res.json(employee);
    } else {
      res.status(404).json({ message: 'employee Not Found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus employee berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      await employee.destroy();
      res.json({ message: 'employee deleted' });
    } else {
      res.status(404).json({ message: 'employee not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;