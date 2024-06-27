var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var categoriesRouter = require('./routes/categories');
var ordersRouter = require("./routes/order");
var customersRouter = require("./routes/customers");
var employeesRouter = require("./routes/employees");
var orderDetailsRouter = require("./routes/orderDetails");
var shippersRouter = require("./routes/shippers");
var suppliersRouter = require("./routes/suppliers");

var authRouter = require('./routes/auth');
var { sequelize } = require('./models');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);
app.use('/customers', customersRouter);
app.use('/employees', employeesRouter);
app.use('/orderDetails', orderDetailsRouter);
app.use('/shippers', shippersRouter);
app.use('/suppliers', suppliersRouter);

sequelize.sync()
    .then(() => {
      console.log('Database synchronized');
    })
    .catch(err => {
      console.error('Error synchronizing database:', err);
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send json response for errors
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;