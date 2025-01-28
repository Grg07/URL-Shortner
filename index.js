const express=require("express");
const path=require("path");
const {route}=require("./routes/main")
const {sroute}=require("./routes/subroute");
const {mongoconnect}=require("./connection/connect");
const {check}=require("./middleware/auth");
const cookies=require("cookie-parser");

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoconnect("mongodb://localhost:27017/shortURL");

app.use(cookies());
app.set("view engine","ejs");
app.set("views",path.resolve("view"));


app.use("/",route);
app.use("/home",check,sroute);

app.listen(8001,()=>{
    console.log("Server has started.. ");
})