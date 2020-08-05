var emailsValidatorHelper = function (emails) {
  //accepts an array of emails.
  emails.forEach(email => {
    emailValidatorHelper(email);
  });
};

var emailValidatorHelper = function (email) {
  //accepts single email.
  let emailRegExp = /^[a-zA-Z]+_\w+@epam\.com$/;
    if (!emailRegExp.test(email.toLowerCase())) {
      throw {
        name: 'ValidationError',
        message: 'User must be an EPAMer or Check username.'
      };
    }
};
module.exports = { emailsValidatorHelper, emailValidatorHelper };
