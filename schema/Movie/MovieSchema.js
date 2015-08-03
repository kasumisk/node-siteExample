var mongoose=require('mongoose')

var MovieSchema=new mongoose.Schema({
    director:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{//更新数据的时候的时间记录
        createAt:{//创建时间
            type:Date,
            default:Date.now()
        },
        updateAt:{//更新时间
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
module.exports=MovieSchema