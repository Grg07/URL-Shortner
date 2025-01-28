
const mongo=require("mongoose");

const sch=new mongo.Schema({
    uname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
});

const user=mongo.model("user",sch);

module.exports={
    user
}