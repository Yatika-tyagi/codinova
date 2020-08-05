const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./backend/_helpers/jwt');
const errorHandler = require('./backend/_helpers/error-handler');
const path = require('path');
const sendMailToUser = require('./backend/_helpers/mail');
const db = require('./backend/_helpers/db');
const User = db.User;
const swaggeruiexpress = require('swagger-ui-express');
var json2xls = require('json2xls');

// const DataTransfer = require('./csv-datatransfer');  //needs to be uncommented if data from csv file needs to be sent into database


const swaggerdoc = require('./backend/_helpers/swagger.json');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


//to load home page
app.use(express.static(path.join(__dirname, 'dist')));

// use JWT auth to secure the api
app.use(jwt());

// use Json to excel parser
app.use(json2xls.middleware);

// api routes
app.use(
  '/users',
  require(path.join(__dirname, '/backend/users/user.controller.js'))
);

app.use(
  '/categories',
  require(path.join(__dirname, '/backend/category/category.controller.js'))
);
// api routes
app.use(
  '/feedback',
  require(path.join(__dirname, '/backend/feedback/feedback.controller.js'))
);

app.use(
  '/question',
  require(path.join(__dirname, '/backend/question/question.controller.js'))
);

app.use(
  '/designation',
  require(path.join(__dirname, '/backend/designation/designation.controller.js'))
);


// api routes
app.use(
  '/report',
  require(path.join(__dirname, '/backend/report/report.controller.js'))
);

app.use(
  '/api-docs',
  swaggeruiexpress.serve,
  swaggeruiexpress.setup(swaggerdoc)
);

// global error handler
app.use(errorHandler);

app.post('/mail', async (req, res) => {
  const user = await User.findById(req.body.id).select('-hash');

  sendMailToUser(
    user.firstName,
    user.lastName,
    user.username,
    req.body.subject,
    req.body.message
  );
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

// start server
const port =
  process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 3000;
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});


// Format to follow : node app.js --file=filename.csv
// const argv = require('minimist')(process.argv.slice(2));
// const csv = argv.file;

// console.log(csv);
//  console.log(DataTransfer(csv));    //needs to be uncommented if data from csv file needs to be sent into database

