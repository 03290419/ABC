const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const productDetailDao = require('./src/models/productDao');
const productController = require('./src/controllers/productController');
// const productDetailServices = require("./src/controllers/productController")

require('dotenv').config();

const app = express();

const indexRouter = require('./src/routes');
app.set('port', process.env.PORT || 8000);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);

app.use((req, _, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, _, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: `${err.status ? err.status : ''} ${err.message}`,
  });
});

app.listen(app.get('port'), () => {
  console.log(`listening.... 🦻http://localhost:${app.get('port')}`);
});
