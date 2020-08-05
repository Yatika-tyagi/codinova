// code to run this file :node csv-datatransfer.js --file=SampleData.csv
const db = require('./backend/_helpers/db');
const fastcsv = require('fast-csv');
var fs = require('fs');
var parse = require('csv-parse');
const User = db.User;
var { generatePassword } = require('./backend/_helpers/global-config');
var { ADDED_USER } = require('./backend/_helpers/status-codes');

var DataTransfer = function datatransfer(csv) {
  // console.log('Processing CSV Data file');
  var v =true;
  var parser = parse({ delimiter: '/n' }, function (err, data) {
    const table = data.slice(1);
  
    table.forEach(row => {
      // console.log(row);
      const columns = row.toString().split(',');

      const name = columns[0];
      const email = columns[1];
      var userdetail = { email, name };
      createUser(userdetail)
        .then(message => console.log(message))
        .catch(err => {console.log(err)});
      // console.log(JSON.stringify(userdetail));
    });
  });

  // read the inputFile, feed the contents to the parser
  fs.createReadStream(csv).pipe(parser);
  return v;
};

async function createUser(param) {
  console.log(param);
  let { email, name, ...restParam } = param;
  let hash = generatePassword();
  let status = ADDED_USER;
  if (await User.findOne({ email: email.toLowerCase() })) {
    throw 'email: ' + param.email + ' is already taken';
  }
  let userObj = {
    email: email.toLowerCase(),
    name: name,
    hash: hash,
    status: status,
    ...restParam
  };

  const user = new User(userObj);

  await user.save();
  return 'User is created';
}

const argv = require('minimist')(process.argv.slice(2));
const csv = argv.file;

console.log(csv);
DataTransfer(csv);

module.exports = DataTransfer;
