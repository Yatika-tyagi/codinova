const bcrypt = require('bcryptjs');
var createHash= function(password){
    return bcrypt.hashSync(password, 10);
}
module.exports={createHash};