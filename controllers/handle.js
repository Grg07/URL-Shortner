const {user}=require("../models/user");
const {url}=require("../models/url");
const nano=require("nanoid");
const jwt  = require("jsonwebtoken");
const Cookies = require("cookies");
const {getuser,setuser}=require("../service/auth")

async function handlerhome(req,res)
{
    res.redirect("/home");
}

function handlersign(req,res)
{
    res.render("sign");
}

function handlesigned(req,res)
{
    if(!req.body.uname || !req.body.email || !req.body.pass)
    {
        res.redirect("/sign");
    }
    else
    {

        user.create({
        uname:req.body.uname,
        email:req.body.email,
        pass:req.body.pass
        }).then(()=>{
            console.log("\n New entry added in user DB")
            res.status(200).render("login")
        }).catch((err)=>{
            console.log("\n Error",err),
            res.status(400).send("Something you did wrong")
        });
    }
}

async function handlerlogged(req,res)
{
    const us=await user.findOne({email:req.body.email,pass:req.body.pass});
    if(!us)
    {
        const msg="Invallied Login !!!!!!!!!!!\n Try again";
        res.render("login",{
            msg
        })
    }
    else
    {
        const token=setuser(us);
        res.cookie("id",token);

        // req.body.user=us;
        res.redirect("/home");
    }
}
function handlerlogin(req,res)
{
    res.render("login");
}

function handlerloginhome(req,res)
{
    res.render("home");
}

async function handlegenerate(req,res)
{
    const token=req.cookies?.id;

    if(!token)
    {
        res.redirect("/login");
    }

    const us=getuser(token);
    const per=await user.findOne({email:us.email,pass:us.passowrd});


    if(!per)
    {
        res.redirect("/login");
    }
    let redirectUrl="http://"+ req.body.redirectUrl;
    let short=nano.nanoid(4);
    const id=per._id;
    await url.create({
        redirectUrl,
        shortUrl:short,
        createdBy:per._id
    }).then(()=>{
        console.log("\n Entry added in url DB")
        res.status(200).render("home",{
            sh:short
        })
    }).catch((err)=>{
        console.log("Error for adding in url DB ",err)
        res.status(400).send("something wrong");
    });
}

async function staichandle(req,res)
{
    const tok=req.cookies?.id;
    const per= getuser(tok);

    const us=await user.findOne({email:per.email,pass:per.passowrd})
    const uname=us.uname;
    const allurl=await url.find({createdBy:us._id});
    if(allurl[0]!=null)
    res.render("home",{
        allurl,uname
    });
    else
    {
        res.render("home");
    }
}

async function handlershort(req,res)
{
    const short=req.params.sh;
    const ur=await url.findOne({shortUrl:short});
    if(!ur)
    {
        return res.send("No short url exists");
    }
    res.redirect(ur.redirectUrl);
}

module.exports={
    handlerhome,handlersign,handlesigned,handlerlogged,handlerlogin,handlerloginhome,handlegenerate,staichandle,handlershort
};

