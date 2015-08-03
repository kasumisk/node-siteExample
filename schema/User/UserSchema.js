var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
    email:String,
    name:String,
    password:String,
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
    var user = this;
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }
    else{
        this.meta.updateAt=Date.now();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err) return next(err)
        bcrypt.hash(user.password,salt,null,function(err,hash){
            if(err) return next(err)
            user.password = hash;
            next();
        })
    });

});
UserSchema.methods = {
    comparePassword:function(_password,cb){
        bcrypt.compare(_password,this.password,function(err,isMatch){
            if (err) return cb(err)
            cb(null,isMatch)
        })

    }
};

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

module.exports = UserSchema