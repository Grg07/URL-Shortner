const express=require("express");
const {handlerhome,handlersign,handleuserpost,handlerlogged,handlerlogin,handlerloginhome,handlegenerate,staichandle}=require("../controllers/handle");
const sroute=express.Router();


// subroute.get("/",(req,res)=>{
//     handlerhome(req,res);
// });

// subroute.get("/login",(req,res)=>{
//     handlerloginhome(req,res);
// });

// subroute.post("/generate",(req,res)=>{
//     handlegenerate(req,res);
// });

// subroute.post("/logged",(req,res)=>{
//     handlerlogged(req,res);
// });

sroute.get("/",(req,res)=>{
    staichandle(req,res);
})


module.exports={
    sroute
}