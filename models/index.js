const { Sequelize } = require('sequelize');
// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize('dpsi2024', 'root', '', {
 host: 'localhost',
 dialect: 'mysql'
});

const sequelize = require('./index');
const Sequelize = require('sequelize');

const Customer = require('./customer')(sequelize, Sequelize);
const Employee = require('./employee')(sequelize, Sequelize);
const Product = require('./product')(sequelize, Sequelize);
const Supplier = require('./supplier')(sequelize, Sequelize);
const Order = require('./order')(sequelize, Sequelize);
const Shipper = require('./shipper')(sequelize, Sequelize);
const OrderDetail = require('./orderDetail')(sequelize, Sequelize);
const Category = require('./category')(sequelize, Sequelize);

// Relasi antara model
Customer.hasMany(Order, { foreignKey: 'customerID' });
Order.belongsTo(Customer, { foreignKey: 'customerID' });

Employee.hasMany(Order, { foreignKey: 'employeeID' });
Order.belongsTo(Employee, { foreignKey: 'employeeID' });

Shipper.hasMany(Order, { foreignKey: 'shipperID' });
Order.belongsTo(Shipper, { foreignKey: 'shipperID' });

Supplier.hasMany(Product, { foreignKey: 'supplierID' });
Product.belongsTo(Supplier, { foreignKey: 'supplierID' });

Category.hasMany(Product, { foreignKey: 'categoryID' });
Product.belongsTo(Category, { foreignKey: 'categoryID' });

Order.hasMany(OrderDetail, { foreignKey: 'orderID' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderID' });

Product.hasMany(OrderDetail, { foreignKey: 'productID' });
OrderDetail.belongsTo(Product, { foreignKey: 'productID' });

module.exports = sequelize;
