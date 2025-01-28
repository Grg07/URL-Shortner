const mongo=require("mongoose");

const sch=new mongo.Schema({
    redirectUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        unique:true,
        required:true
    },
    createdBy:{
        type:mongo.Schema.ObjectId,
        required:true
    }
});

const url=mongo.model("url",sch);

module.exports={
    url
}