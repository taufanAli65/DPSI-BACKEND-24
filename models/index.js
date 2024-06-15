const { Sequelize } = require('sequelize');
// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize('dpsi2024', 'root', '', {
 host: 'localhost',
 dialect: 'mysql'
});

//define models
const Category = require('./category')(sequelize, Sequelize.DataTypes);
const Customer = require('./customer')(sequelize, Sequelize.DataTypes);
const Employee = require('./employee')(sequelize, Sequelize.DataTypes);
const Order = require('./order')(sequelize, Sequelize.DataTypes);
const OrderDetail = require('./orderDetail')(sequelize, Sequelize.DataTypes);
const Product = require('./product')(sequelize, Sequelize.DataTypes);
const Shipper = require('./shipper')(sequelize, Sequelize.DataTypes);
const Supplier = require('./supplier')(sequelize, Sequelize.DataTypes);
const User = require('./user')(sequelize, Sequelize.DataTypes);


//database relation
Category.hasMany(Product, { foreignKey: "categoryID" });
Product.belongsTo(Category, { foreignKey: "categoryID" });
Customer.hasMany(Order, { foreignKey: "customerID" });
Order.belongsTo(Customer, { foreignKey: "customerID" });
Employee.hasMany(Order, { foreignKey: "employeeID" });
Order.belongsTo(Employee, { foreignKey: "employeeID" });
Order.hasMany(OrderDetail, { foreignKey: "orderID" });
OrderDetail.belongsTo(Order, { foreignKey: "orderID" });
Product.hasMany(OrderDetail, { foreignKey: "productID" });
OrderDetail.belongsTo(Product, { foreignKey: "productID" });
Shipper.hasMany(Order, { foreignKey: "shipperID" });
Order.belongsTo(Shipper, { foreignKey: "shipperID" });
Supplier.hasMany(Product, { foreignKey: "supplierID" });
Product.belongsTo(Supplier, { foreignKey: "supplierID" });


// Uji koneksi
sequelize.sync()
 .then(() => {
 console.log('Connection has been established successfully.');
 })
 .catch(err => {
 console.error('Unable to connect to the database:', err);
 });
// Ekspor instance sequelize untuk digunakan di tempat lain
module.exports = {sequelize, Category, Customer, Employee, Order, OrderDetail, Product, Shipper, Supplier, User};