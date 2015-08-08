var mongoose   = require('mongoose');
var UserModel  = mongoose.model('User');
var config     = require('../config');
var eventproxy = require('eventproxy');
var UserProxy  = require('../proxy').User;

/**
 * ��Ҫ����ԱȨ��
 */
exports.adminRequired = function (req, res, next) {
    if (!req.session.user) {
        return res.render('notify/notify', { error: '�㻹û�е�¼��' });
    }

    if (!req.session.user.is_admin) {
        return res.render('notify/notify', { error: '��Ҫ����ԱȨ�ޡ�' });
    }

    next();
};

/**
 * ��Ҫ��¼
 */
exports.userRequired = function (req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(403).send('forbidden!');
    }

    next();
};

exports.blockUser = function () {
    return function (req, res, next) {
        if (req.path === '/signout') {
            return next();
        }

        if (req.session.user && req.session.user.is_block && req.method !== 'GET') {
            return res.status(403).send('���ѱ�����Ա�����ˡ�����������ϵ @alsotang��');
        }
        next();
    };
};


function gen_session(user, res) {
    var auth_token = user._id + '$$$$'; // �Ժ���ܻ�洢������Ϣ���� $$$$ ���ָ�
    var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
    };
    res.cookie(config.auth_cookie_name, auth_token, opts); //cookie ��Ч��30��
}

exports.gen_session = gen_session;

// ��֤�û��Ƿ��¼
exports.authUser = function (req, res, next) {
    var ep = new eventproxy();
    ep.fail(next);

    // Ensure current_user always has defined.
    res.locals.current_user = null;

    if (config.debug && req.cookies['mock_user']) {
        var mockUser = JSON.parse(req.cookies['mock_user']);
        req.session.user = new UserModel(mockUser);
        if (mockUser.is_admin) {
            req.session.user.is_admin = true;
        }
        return next();
    }

    ep.all('get_user', function (user) {
        if (!user) {
            return next();
        }
        user = res.locals.current_user = req.session.user = new UserModel(user);

        if (config.admins.hasOwnProperty(user.loginname)) {
            user.is_admin = true;
        }

        Message.getMessagesCount(user._id, ep.done(function (count) {
            user.messages_count = count;
            next();
        }));
    });

    if (req.session.user) {
        ep.emit('get_user', req.session.user);
    } else {
        var auth_token = req.signedCookies[config.auth_cookie_name];
        if (!auth_token) {
            return next();
        }

        var auth = auth_token.split('$$$$');
        var user_id = auth[0];
        UserProxy.getUserById(user_id, ep.done('get_user'));
    }
};
