var EventProxy = require('eventproxy');
var _ = require('lodash');

var Message = require('../models').Message;

/**
 * �����û�ID����ȡδ����Ϣ������
 * Callback:
 * �ص����������б�
 * - err, ���ݿ����
 * - count, δ����Ϣ����
 * @param {String} id �û�ID
 * @param {Function} callback ��ȡ��Ϣ����
 */
exports.getMessagesCount = function (id, callback) {
    Message.count({master_id: id, has_read: false}, callback);
};


/**
 * ������ϢId��ȡ��Ϣ
 * Callback:
 * - err, ���ݿ����
 * - message, ��Ϣ����
 * @param {String} id ��ϢID
 * @param {Function} callback �ص�����
 */
exports.getMessageById = function (id, callback) {
    Message.findOne({_id: id}, function (err, message) {
        if (err) {
            return callback(err);
        }
        getMessageRelations(message, callback);
    });
};

var getMessageRelations = exports.getMessageRelations = function (message, callback) {
    if (message.type === 'reply' || message.type === 'reply2' || message.type === 'at') {
        var proxy = new EventProxy();
        proxy.fail(callback);
        proxy.assign('author', 'topic', 'reply', function (author, topic, reply) {
            message.author = author;
            message.topic = topic;
            message.reply = reply;
            if (!author || !topic) {
                message.is_invalid = true;
            }
            return callback(null, message);
        }); // �����쳣
        User.getUserById(message.author_id, proxy.done('author'));
        Topic.getTopicById(message.topic_id, proxy.done('topic'));
        Reply.getReplyById(message.reply_id, proxy.done('reply'));
    } else {
        return callback(null, {is_invalid: true});
    }
};

/**
 * �����û�ID����ȡ�Ѷ���Ϣ�б�
 * Callback:
 * - err, ���ݿ��쳣
 * - messages, ��Ϣ�б�
 * @param {String} userId �û�ID
 * @param {Function} callback �ص�����
 */
exports.getReadMessagesByUserId = function (userId, callback) {
    Message.find({master_id: userId, has_read: true}, null,
        {sort: '-create_at', limit: 20}, callback);
};

/**
 * �����û�ID����ȡδ����Ϣ�б�
 * Callback:
 * - err, ���ݿ��쳣
 * - messages, δ����Ϣ�б�
 * @param {String} userId �û�ID
 * @param {Function} callback �ص�����
 */
exports.getUnreadMessageByUserId = function (userId, callback) {
    Message.find({master_id: userId, has_read: false}, null,
        {sort: '-create_at'}, callback);
};


/**
 * ����Ϣ���ó��Ѷ�
 */
exports.updateMessagesToRead = function (userId, messages, callback) {
    callback = callback || _.noop;
    if (messages.length === 0) {
        return callback();
    }

    var ids = messages.map(function (m) {
        return m.id;
    });

    var query = { master_id: userId, _id: { $in: ids } };
    Message.update(query, { $set: { has_read: true } }, { multi: true }).exec(callback);
};
