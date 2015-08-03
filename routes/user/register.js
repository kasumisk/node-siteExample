var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../../models/user/Users")

router.get("/register",function(req, res, next) {
    res.render('register', { title: 'Express' });
});

router.post("/api/register",function(req, res, next) {
    console.log("body========="+req.body)
    console.log("query=========="+req.query)
    //注册提交
    var Username = req.body.Username;
    console.log(Username)

    var Email = req.body.Email;
    var Password = req.body.Password;
    var RePassword = req.body.RePassword;
    if(Password === RePassword){
        if(Username){
            User.findUserByName(Username,function(err,doc){
                console.log("返回数据================"+doc)
                if(doc){
                    console.log("名字已注册")
                    res.end("名字已注册")
                }else{
                    console.log("保存==========================")
                    var user = new User({
                        email:Email,
                        name:Username,
                        password:Password
                    })
                    user.save(function(err){
                        if(err){
                            console.log(err)
                        }
                        else res.end()
                    })
                }
            })

        }
    }else{
        res.send("两次密码不一致，请重新输入密码")
    }


});

module.exports = router;