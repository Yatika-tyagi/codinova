var passwordValidatorHelper = function (password) {
    let passwordRegExp = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!passwordRegExp.test(password)) {
        throw { 'name': 'ValidationError', 'message': 'Password must contain at least 6 characters, both lower and uppercase characters and a special character' };
    }
};
module.exports = { passwordValidatorHelper };
