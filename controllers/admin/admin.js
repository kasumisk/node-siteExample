var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var util = require('util');
var AVATAR_UPLOAD_FOLDER = "/upload/";

//upload
exports.upload = function (req, res) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {
        if (err) {
            res.locals.error = err;
            res.render('index', { title: "" });
            return;
        }
        //res.end(util.inspect({fields: fields, files: files}));
        var extName = '';  //后缀名
        switch (files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if(extName.length == 0){
            res.locals.error = '只支持png和jpg格式图片';
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('只支持png和jpg格式图片');
            return;
        }
        var timeTemp = new Date().getTime();
        var avatarName =timeTemp + ((10000*Math.random().toFixed(4)).toString()) + '.' + extName;
        var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.file.path, newPath);  //重命名

    });

    form.on('end', function() {
        res.locals.success = '上传成功';
        console.log('-> post done');
        res.writeHead(200, {'content-type': 'application/json'});
        res.end('received fields:\n\n ');
    });

};