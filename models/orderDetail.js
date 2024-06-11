const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Order = require('./order');
const Product = require('./product');

const OrderDetail = sequelize.define('OrderDetail', {
  orderDetailID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'orderID'
    }
  },
  productID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'productID'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

//Relasi antara OrderDetail dan Order
OrderDetail.belongsTo(Order, {foreignKey:'productID'});
Order.hasMany(OrderDetail, {foreignKey:'productID'});

//Relasi antara OrderDetail dan Product
OrderDetail.belongsTo(Product, {foreignKey:'productID'});
Product.hasMany(OrderDetail, {foreignKey:'productID'});

module.exports = OrderDetail;