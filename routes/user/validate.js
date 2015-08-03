var User = require('../../models/User')
var express = require('express');
var router = express.Router();


router.get('/api/validate',function(req,res){
    console.log("daa")
    var _userId = req.session._userId
    if(_userId){
        User.findUserById(_userId,function(err,user){
            if(err){
                res.json(401,{
                    msg:err
                })
            }else{
                res.json(user)
            }
        })
    }else{
        res.json(401,null)
    }
})

router.post('/api/login',function(req,res){
    console.log("login")
    var email = req.body.email
    if(email){
        User.findByEmailOrCreate(email,function(err,user){
            if(err){
                res.json(500,{
                    mes:err
                })
            }else{
                req.session._userId = user._id
                res.json(user)
            }

        })
    }else{
        res.json(403)
    }

})


router.get('/api/logout',function(req,res){
    req.session._userId = null
    res.json(401)
})


module.exports = router;