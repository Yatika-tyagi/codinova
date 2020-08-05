const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const sendMailToUser = require('../_helpers/mail');
const userPassword = require('../_helpers/global-config').USER_PASSWORD;
const HOST_NAME = require('../_helpers/global-config').HOST_NAME;
const status_codes = require('../_helpers/status-codes');
const generateHash = require('../_helpers/bcrypt');
const getEmailBody = require('../_helpers/email-body');
const generate_token = require('../_helpers/generate-token');
const User = db.User;

module.exports = {
  authenticate,
  create,
  getByEmail,
  sendVerifyMail,
  verifyEmailWithCode,
  createUser,
  sendForgotPasswordMail,
  changePassword,
  updatePassword
};

async function authenticate(param) {
  let email_lowercase = param.email.toLowerCase();
  let password = param.password;
  //make db query
  console.log("test");
  const user = await User.findOne({ email: email_lowercase });
  //if user does not exist.
  if (!user) {
    throw param.email + ' does not exist, please, signing up before login.';
  } else {
    if (user.status == status_codes.INACTIVE_CODE) {
      throw param.email + ' Account not activated,Please verify account';
    }
  }
  //decrypt password and return jwt token with usser info.
  if (bcrypt.compareSync(password, user.hash)) {
    const token = generate_token(user);
    return { token: token };
  }
}

async function create(param) {
  let { email, password, ...restParam } = param;
  let email_lowercase = email.toLowerCase();
  //already exists

  if (await User.findOne({ email: email_lowercase })) {
    console.log('User found already');
    throw 'email: ' + param.email + ' is already taken';
  }
  // encrypt password
  let hash = generateHash.createHash(password);
  //refined user info
  let userObj = { email: email_lowercase, hash: hash, ...restParam };
  const user = new User(userObj);
  // save user
  await user.save();

  sendVerifyMail(email_lowercase);
  return 'New user is created';
}

async function getByEmail({ email }) {
  const user = await User.find(
    { email: new RegExp('.*' + email + '.*', 'i') },
    { email: 1, name: 1 }
  );
  if (!user.length) {
    throw `User with email id ${email} not found.`;
  }
  return user;
}

async function sendVerifyMail(email_lowercase) {
  const userInfo = await User.findOne({ email: email_lowercase });
  if (userInfo) {
    let tokenCode = `${email_lowercase}${new Date()
      .getTime()
      .toString()
      .substring(5, 10)}`;
    userInfo.code = bcrypt.hashSync(tokenCode).replace(/\//g, '-'); // just to replace "/" if generated
    await userInfo.save();
    const htmlToSend = `
        <html> 
        Please use the link below to to verify your account:<br>
        <a href=${HOST_NAME}/verify/${userInfo.code}'>Click here</a><br/>
        ${HOST_NAME}/verify/${userInfo.code}
        <br><br><br>
        Regards<br>
        HEATMAP Team
         </html>`;

    sendMailToUser(userInfo.name, userInfo.email, 'Verify Email', htmlToSend);
  }

  //do not send any error is user is not found - security issue
  //if found, send mail

  return 'ok';
}

async function verifyEmailWithCode(code) {
  //find the code in db and change its status to active
  const user = await User.find({ code: code });
  if (!user.length) {
    throw `Invalid URL`;
  }
  await User.findOneAndUpdate(
    { code: code },
    { status: status_codes.ACTIVE_CODE },
    { useFindAndModify: false }
  );

  return 'ok';
}
// use to create dead user
async function createUser(param) {
  console.log(param);
  let { email, name, ...restParam } = param;
  // let hash = bcrypt.hashSync(password, 10);
  //if email already exists
  if (await User.findOne({ email: email.toLowerCase() })) {
    console.log('Email already taken');
    throw 'email: ' + param.email + ' is already taken';
  }
  let userObj = {
    email: email.toLowerCase(),
    name: name,
    hash: generateHash.createHash(userPassword),
    status: status_codes.ADDED_USER,
    ...restParam
  };
  console.log(userObj);
  const user = new User(userObj);
  //save user
  await user.save();
  return 'User is created';
}

async function sendForgotPasswordMail(email) {
  const userInfo = await User.findOne({ email: email });
  if (!userInfo) {
    throw 'Invalid Email';
  }
  if (userInfo.status == status_codes.INACTIVE_CODE) {
    throw 'email: ' + param.email + ' is not yet active.Please activate';
  }
  let tokenCode = `${email}${new Date().getTime().toString().substring(5, 10)}`;
  userInfo.code = bcrypt.hashSync(tokenCode).replace(/\//g, '-'); // just to replace "/" if generated
  console.log(userInfo.code);
  await userInfo.save();
  const mail_body = getEmailBody.forgot_password_body(userInfo.code);
  sendMailToUser(userInfo.name, userInfo.email, 'Change Password', mail_body);

  return `Mail sent to ${email}`;
}

async function changePassword(param) {
  const user = await User.find({ code: param.code });
  console.log(user);
  if (!user.length) {
    throw `Invalid URL`;
  }

  await User.findOneAndUpdate(
    { code: param.code },
    { hash: generateHash.createHash(param.password) },
    { useFindAndModify: false }
  );
  return 'Password Changed';
}

async function updatePassword(param) {
  let { email, oldPassword, newPassword, name } = param;
  let email_lowercase = email.toLowerCase();
  const oldHash = await User.findOne({ email: email_lowercase }, { hash: 1 });
  if (bcrypt.compareSync(oldPassword, oldHash.hash)) {
    let newHash = bcrypt.hashSync(newPassword, 10);
    const user = await User.updateOne(
      { email: email_lowercase },
      { $set: { hash: newHash, status: status_codes.ACTIVE_CODE } }
    );
    const token = generate_token({
      name,
      email,
      status: status_codes.ACTIVE_CODE
    });
    return user.n != 0
      ? { message: 'Password Changed', token: token }
      : { error: 'Password Could Not Be Changed' };
  } else {
    return { error: 'Your Old Password is Wrong' };
  }
}
