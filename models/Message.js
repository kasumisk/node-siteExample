var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

/*
 * type:
 * reply: xx �ظ�����Ļ���
 * reply2: xx �ڻ����лظ�����
 * follow: xx ��ע����
 * at: xx ������
 */

var MessageSchema = new Schema({
    type: { type: String },
    master_id: { type: ObjectId},
    author_id: { type: ObjectId },
    topic_id: { type: ObjectId },
    reply_id: { type: ObjectId },
    has_read: { type: Boolean, default: false },
    create_at: { type: Date, default: Date.now }
});
MessageSchema.plugin(BaseModel);
MessageSchema.index({master_id: 1, has_read: -1, create_at: -1});

mongoose.model('Message', MessageSchema);
