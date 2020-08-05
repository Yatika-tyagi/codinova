const config = require('../../dbconfig.json');
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose
  .connect(process.env.MONGODB_URI || config.connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to mongo db');
  })
  .catch(e => {
    console.log('an error while connecting to database ', e);
  });
mongoose.Promise = global.Promise;

module.exports = {
  Product: require('../product/product.model'),
  User: require('../user/user.model'),
  Cart: require('../cart/cart.model'),
};
