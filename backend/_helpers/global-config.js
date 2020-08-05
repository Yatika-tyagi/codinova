const EMAIL_SERVICE = 'gmail';
const SENDER_EMAIL = 'heatmaptool@gmail.com';
const SENDER_EMAIL_PASSWORD = 'EPAM@heatmaptool';
const HOST_NAME="https://heatmaptool.herokuapp.com";
const USER_PASSWORD='DeadUser@123';
const CSVFILE_NAME ='SampleData.csv';
const bcrypt = require('bcryptjs');
const DOWNLOAD_EXCEL_FILE_NAME = 'Reports';
const EXCEL_SHEET_NAME = 'Sheet 1';
const SERVER_REPORT_EXCEL_NAME = "report.xlsx";
const SERVER_COLOR_REPORT_EXCEL_NAME = "colored_report.xlsx";
var generatePassword = function genpwd(){
    return bcrypt.hashSync(USER_PASSWORD, 10);
}


module.exports = { 
    EMAIL_SERVICE,
    SENDER_EMAIL,
    SENDER_EMAIL_PASSWORD,
    HOST_NAME,
    USER_PASSWORD,
    DOWNLOAD_EXCEL_FILE_NAME,
    CSVFILE_NAME, 
    generatePassword,
    EXCEL_SHEET_NAME,
    SERVER_REPORT_EXCEL_NAME,
    SERVER_COLOR_REPORT_EXCEL_NAME
};

