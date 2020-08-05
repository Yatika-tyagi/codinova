const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const { credentialValidator, emailValidator,passwordValidator } = require('../middleware/credentialValidator');
// routes
module.exports = router;
router.post('/login',credentialValidator, authenticate);
router.post('/signup',credentialValidator, register);
router.post('/addUser',emailValidator, addUser);
router.get('/', getByEmail);
router.get('/send-verify-mail/:email', sendVerifyMail);
router.get('/verify-email/:code', verifyEmailWithCode);
router.get('/forgot-password-email/:email',sendForgotPasswordMail);
router.post('/forgot-password-change',passwordValidator,changePassword)
router.post('/updatepassword', updatePassword);


module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: 'email or password is incorrect' })
    )
    .catch(err => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(message => res.json({ message }))
    .catch(err =>{console.log(err); next(err);});
}
function getByEmail(req, res, next) {
  userService
    .getByEmail(req.query)
    .then(users => res.json(users))
    .catch(err => next(err));
}

function sendVerifyMail(req, res, next){
    userService.sendVerifyMail(req.params.email)
    .then((response)=> res.json(response))
    .catch(err => next(err));
}

function verifyEmailWithCode(req, res, next){
    userService.verifyEmailWithCode(req.params.code)
    .then((response)=> res.json(response))
    .catch(err => next(err));
}
function addUser(req, res, next) {
  userService
    .createUser(req.body)
    .then(message => res.json({ message }))
    .catch(err => {next(err);});
}
function sendForgotPasswordMail(req,res,next){
  userService.sendForgotPasswordMail(req.params.email.toLowerCase())
  .then(message=>res.json({message}))
  .catch(err => next(err));
}
function changePassword(req,res,next){
  userService.changePassword(req.body)
  .then(message=>res.json({message}))
  .catch(err => next(err));
}

function updatePassword(req, res, next) {
  userService
    .updatePassword(req.body)
    .then((message) => res.json(message))
    .catch(err => next(err));
}
