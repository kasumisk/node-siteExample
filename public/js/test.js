$(function(){
    //粉丝魔方接口

    var appid = "0591ea902544426abd11d4c9c0276130";
    var activityid = "55a86c4c3c306b2f90566e2a";
    var userid = "55a869fc3c306b2f90566e26";
    var username = "iaround";
    var drawid = "";

    function GetCoupon() {
       /* var timestamp = (new Date()).valueOf();
        console.log(timestamp)
        var encryptstr = appid + "1437031433868";
        var s_md5 = md5(encryptstr).toUpperCase();
        console.log("md5 ======="+ s_md5)
        var des = encrypt(appsecret, s_md5);
        console.log(des);*/
        /*$.ajax({
         async:false,
         url:"http://webapitest.fanso2o.com/api/AppUserDrawCoupon?",
         type:"POST",
         dataType:'jsonp',
         jsonp:'jsoncallback',
         data: {
         appid: appid,
         activityid: activityid,
         timestamp: timestamp,
         signature: des,
         userid: userid,
         username: username,
         callback:'jsoncallback'
         },
         success:function(json){
         console.log(json);
         },
         complete:function(data){
         console.log(data)
         },
         error:function(error){

         }
         });*/
        $.get("/api/AppUserCompanyResource", {
            appid: appid,
            activityid: activityid,
            userid: userid,
            username: username
        }, function(result) {
            console.log(result);
        });

    };

    function jsoncallback (data){
        console.log(data)
    }

    GetCoupon();
   //http://webapitest.fanso2o.com/api/UserCoupon   红包记录
   //http://webapitest.fanso2o.com/api/CouponDetails.do  红包详情
   // http://www.test.iaround.com/mofang/action/UserCoupon.do?userID=12357&type=1&pagesize=1&page=1&callback=callback
    $.get("http://webapitest.fanso2o.com/api/UserCoupon", {
        appid:appid,
        userid: userid,
        type:'1',
        pagesize:"20",
        page:"1"
    }, function(result) {
        console.log(result);
        var drawid = result
        $.get("http://webapitest.fanso2o.com/api/CouponDetails", {
            appid:appid,
            userid: userid,
            drawid:drawid
        }, function(result) {
            console.log(result);
        });
    });


})