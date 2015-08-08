var express = require("express");
var sign = require("../../controllers/sign");
var user = require("../../controllers/user");
var config = require("./config");

var router = express.Router();

// sign

router.post('/signout', sign.signout);  // �ǳ�
router.get('/signin', sign.showLogin);  // �����¼ҳ��
router.post('/signin', sign.login);  // ��¼У��
router.get('/active_account', sign.activeAccount);  //�ʺż���

router.get('/search_pass', sign.showSearchPass);  // �һ�����ҳ��
router.post('/search_pass', sign.updateSearchPass);  // ��������
router.get('/reset_pass', sign.resetPass);  // ������������ҳ��
router.post('/reset_pass', sign.updatePass);  // ��������

// user controller
router.get('/user/:name', user.index); // �û�������ҳ
router.get('/setting', auth.userRequired, user.showSetting); // �û���������ҳ
router.post('/setting', auth.userRequired, user.setting); // �ύ������Ϣ����
router.get('/stars', user.listStars); // ��ʾ���д����б�ҳ
router.get('/users/top100', user.top100);  // ��ʾ����ǰһ���û�ҳ
router.get('/user/:name/collections', user.listCollectedTopics);  // �û��ղص����л���ҳ
router.get('/user/:name/topics', user.listTopics);  // �û����������л���ҳ
router.get('/user/:name/replies', user.listReplies);  // �û���������лظ�ҳ
router.post('/user/set_star', auth.adminRequired, user.toggleStar); // ��ĳ�û���Ϊ����
router.post('/user/cancel_star', auth.adminRequired, user.toggleStar);  // ȡ��ĳ�û��Ĵ������
router.post('/user/:name/block', auth.adminRequired, user.block);  // ����ĳ�û�
router.post('/user/:name/delete_all', auth.adminRequired, user.deleteAll);  // ɾ��ĳ�û����з���


//user