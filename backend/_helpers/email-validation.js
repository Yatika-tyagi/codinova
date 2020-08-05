var emailsValidatorHelper = function (emails) {
  //accepts an array of emails.
  emails.forEach(email => {
    emailValidatorHelper(email);
  });
};

var emailValidatorHelper = function (email) {
  //accepts single email.
  
};
module.exports = { emailsValidatorHelper, emailValidatorHelper };
