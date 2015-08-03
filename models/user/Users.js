var mongoose = require('mongoose');

var UserSchema=require('../../schema/User/UserSchema');
var Users=mongoose.model('Users',UserSchema);

module.exports = Users;