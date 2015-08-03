var express = require('express');
var router = express.Router();
var User =  require("../../models/user/Users");

router.get("/login",function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post("/api/login",function(req, res, next) {
    //登陆验证
    var Username = req.body.Username;
    var Password = req.body.Password;
    if(Username){
        User.findUserByName(Username,function(err,user){
            console.log("返回数据================"+user)
            if(user){
                user.comparePassword(Password,function(err,isMatch){
                    if(err){
                        console.log(err)
                    }
                    if(isMatch){
                        return res.redirect("/admin/movieList");

                    }else{
                        console.log("password err")
                    }
                })

            }else{
                console.log("用户名未注册")

            }
        })
    }

});

router.post("/api/logout",function(req, res ){
        delete req.session.user; //删除session
        // delete app.locals.user;//删除本地变量
        res.redirect('/')
});

module.exports = router;