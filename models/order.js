const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Customer = require('./customer');
const Employee = require('./employee');
const Shipper = require('./shipper');

const Order = sequelize.define('Order', {
  orderID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: Customer,
      key:'customerID'
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  employeeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: Employee,
      key: 'employeeID'
    }
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  shipperID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Shipper,
      key: 'shipperID'
    }
  }
});

//Relasi antara Order dan Customer
Order.belongsTo(Customer, {foreignKey:'customerID'});
Customer.hasMany(Order, {foreignKey:'customerID'});

//Relasi antara Order dan Employee
Order.belongsTo(Employee, {foreignKey:'employeeID'});
Employee.hasMany(Order, {foreignKey:'employeeID'});

//Relasi antara Order dan Shipper
Order.belongsTo(Shipper, {foreignKey:'shipperID'});
Shipper.hasMany(Order, {foreignKey:'shipperID'})

module.exports = Order;