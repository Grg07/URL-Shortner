const {user}=require("../models/user");
const {url}=require("../models/url");
const { getuser } = require("../service/auth");

async function check(req,res,next)
{
   const token=req.cookies?.id;
   const us =getuser(token);

   if(!us)
   {
      res.redirect("/login");
   }
   else
   {
      const per=user.find({email:us.email,pass:us.pass});

      if(!per)
      {
         res.redirect("/login");
      }

      next();
      
   }


}

module.exports={
   check
}