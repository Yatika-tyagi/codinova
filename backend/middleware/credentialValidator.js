const { emailValidatorHelper,emailsValidatorHelper } = require('../_helpers/email-validation');
const { passwordValidatorHelper } = require('../_helpers/password-validation');
var credentialValidator = function (req, res, next) {
    //validates single password and single email.
    emailValidatorHelper(req.body.email);
    passwordValidatorHelper(req.body.password);
    next();
}
var emailValidator = function (req, res, next) {    
    //validates single email
    let email = req.body.email;
    emailValidatorHelper(email);
    next();
}
var emailsValidator = function (req, res, next) {
    //validates array of emails
    let emails = [req.body.to, req.body.from];
    console.log(emails);
    emailsValidatorHelper(emails);
    next();
}
var passwordValidator = function (req, res, next) {
    //validates single password
    let password = req.body.password;
    passwordValidatorHelper(password);
    next();
}
module.exports = {credentialValidator,emailValidator,passwordValidator,emailsValidator};