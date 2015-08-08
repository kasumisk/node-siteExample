var mongoose = require('mongoose');

var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
    email:String,
    name:String,
    pass:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }

});

UserSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }
    else{
        this.meta.updateAt=Date.now();
    }
    next();
});

UserSchema.statics = {
    findUserById :function(_userId,callback){
        return this.findOne({
            _id:_userId
        },callback)
    },
    findUserByName :function(_userName,callback){
        return this.findOne({
            name:_userName
        },callback)
    },
    findByEmailOrCreate:function(email,callback){
        return this.findOne({
            email:email
        },function(err,user){
            if(user){
                callback(null,user)
            }else{
                user = new User();
                user.name = email.split('@')[0];
                user.email = email;
                user.save(callback)

            }
        })

    }
};

var User=mongoose.model('User',UserSchema);

module.exports = User;