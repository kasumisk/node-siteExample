var mongoose = require('mongoose');

var MovieSchema=new mongoose.Schema({
    director:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{//�������ݵ�ʱ���ʱ���¼
        createAt:{//����ʱ��
            type:Date,
            default:Date.now()
        },
        updateAt:{//����ʱ��
            type:Date,
            default:Date.now()
        }
    }
})

MovieSchema.pre('save',function(next){
    console.log("director==============="+this.director)
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    console.log("movesaveend============")
    next()

})
MovieSchema.statics={
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}
var Movie=mongoose.model('Movie',MovieSchema);

module.exports = Movie;