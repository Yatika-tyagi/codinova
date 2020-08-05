const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./backend/_helpers/jwt');
const errorHandler = require('./backend/_helpers/error-handler');
const path = require('path');
const db = require('./backend/_helpers/db');
const swaggeruiexpress = require('swagger-ui-express');
var corsOptions = {
  origin: 'http://localhost:3000/',
}
app.use(cors());

app.use(
  '/product',
  require(path.join(__dirname, '/backend/product/product.controller.js'))
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


//to load home page
app.use(express.static(path.join(__dirname, 'dist')));

// use JWT auth to secure the api
// app.use(jwt());


// app.use(
//   '/api-docs',
//   swaggeruiexpress.serve,
//   swaggeruiexpress.setup(swaggerdoc)
// );

// global error handler
app.use(errorHandler);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

// start server
const port =
  process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 3004;
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});


// Format to follow : node app.js --file=filename.csv
// const argv = require('minimist')(process.argv.slice(2));
// const csv = argv.file;

// console.log(csv);
//  console.log(DataTransfer(csv));    //needs to be uncommented if data from csv file needs to be sent into database
