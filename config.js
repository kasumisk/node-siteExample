/**
 * config
 */

var path = require('path');

var config = {
    // debug Ϊ true ʱ�����ڱ��ص���
    debug: true,

    get mini_assets() { return !this.debug; }, // �Ƿ����þ�̬�ļ��ĺϲ�ѹ���������ͼ�е�Loader

    name: 'Nodeclub', // ��������
    description: 'CNode��Node.jsרҵ��������', // ����������
    keywords: 'nodejs, node, express, connect, socket.io',

    // ��ӵ� html head �е���Ϣ
    site_headers: [
        '<meta name="author" content="EDP@TAOBAO" />'
    ],
    site_logo: '/public/images/cnodejs_light.svg', // default is `name`
    site_icon: '/public/images/cnode_icon_32.png', // Ĭ��û�� favicon, ������д��ַ
    // ���Ͻǵĵ�����
    site_navs: [
        // ��ʽ [ path, title, [target=''] ]
        [ '/about', '����' ]
    ],
    // cdn host���� http://cnodejs.qiniudn.com
    site_static_host: '', // ��̬�ļ��洢����
    // ����������
    host: 'localhost',
    // Ĭ�ϵ�Google tracker ID������վ�����޸ģ������ַ��http://www.google.com/analytics/
    google_tracker_id: '',
    // Ĭ�ϵ�cnzz tracker ID������վ�����޸�
    cnzz_tracker_id: '',

    // mongodb ����
    db: 'mongodb://127.0.0.1:27017/test',

    // redis ���ã�Ĭ���Ǳ���
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,

    session_secret: 'node_club_secret', // ����޸�
    auth_cookie_name: 'node_club',

    // �������еĶ˿�
    port: 3000,
    hostname:'127.0.0.1',
    // �����б���ʾ�Ļ�������
    list_topic_count: 20,

    // RSS����
    rss: {
        title: 'CNode��Node.jsרҵ��������',
        link: 'http://cnodejs.org',
        language: 'zh-cn',
        description: 'CNode��Node.jsרҵ��������',
        //����ȡ��RSS Item����
        max_rss_items: 50
    },

    // ��������
    mail_opts: {
        host: 'smtp.163.com',
        port: 25,
        auth: {
            user: 'kasumisk@163.com',
            pass: 'friendly123'
        }
    },

    //weibo app key
    weibo_key: 10000000,
    weibo_id: 'your_weibo_id',

    // admin ��ɾ�����⣬�༭��ǩ����ĳ��Ϊ����
    admins: { user_login_name: true },

    // github ��½������
    GITHUB_OAUTH: {
        clientID: 'your GITHUB_CLIENT_ID',
        clientSecret: 'your GITHUB_CLIENT_SECRET',
        callbackURL: 'http://cnodejs.org/auth/github/callback'
    },
    // �Ƿ�����ֱ��ע�ᣨ����ֻ���� github �ķ�ʽ��
    allow_sign_up: true,

    // newrelic �Ǹ����������վ���ܵķ���
    newrelic_key: 'yourkey',

    // �����������ö����ļ��ϴ�������

    // 7ţ��access��Ϣ�������ļ��ϴ�
    qn_access: {
        accessKey: 'your access key',
        secretKey: 'your secret key',
        bucket: 'your bucket name',
        domain: 'http://your qiniu domain'
    },

    // �ļ��ϴ�����
    // ע�������д qn_access������ϴ��� 7ţ������������Ч
    upload: {
        path: path.join(__dirname, 'public/upload/'),
        url: '/public/upload/'
    },

    // ���
    tabs: [
        ['share', '����'],
        ['ask', '�ʴ�'],
        ['job', '��Ƹ'],
    ],

    // ��������
    jpush: {
        appKey: 'YourAccessKeyyyyyyyyyyyy',
        masterSecret: 'YourSecretKeyyyyyyyyyyyyy',
        isDebug: false,
    },

    create_post_per_day: 1000, // ÿ���û�һ����Է���������
    create_reply_per_day: 1000, // ÿ���û�һ����Է���������
    visit_per_day: 1000, // ÿ�� ip ÿ���ܷ��ʵĴ���
};

if (process.env.NODE_ENV === 'test') {
    config.db = 'mongodb://127.0.0.1:27017/test';
}

module.exports = config;
