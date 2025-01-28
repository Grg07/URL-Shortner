const express=require("express");
const {handlerhome,handlersign,handlesigned,handlerlogged,handlerlogin,handlerloginhome,handlegenerate,handlershort}=require("../controllers/handle");
const route=express.Router();

route.get("/",(req,res)=>{
    handlerhome(req,res);
});

route.get("/sign",(req,res)=>{
    handlersign(req,res);
});

route.get("/short/:sh",(req,res)=>{
    handlershort(req,res);
});

route.get("/login",(req,res)=>{
    handlerlogin(req,res);
});

// route.get("/login/home",(req,res)=>{
//     handlerloginhome(req,res);
// });

route.post("/signed",(req,res)=>{
    handlesigned(req,res);
})

route.post("/logged",(req,res)=>{
    handlerlogged(req,res);
});

route.post("/generate",(req,res)=>{
    handlegenerate(req,res);
});

module.exports={
    route
}

