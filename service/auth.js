const jwt=require("jsonwebtoken");
const secret="ggsecret";
function getuser(token)
{
    if(!token)
    {
        return null;
    }
    try
    {
        return jwt.verify(token,secret);
    }
    catch(err)
    {
        return null;
    }
}

function setuser(user){
    return jwt.sign({
        "email":user.email,
        "passowrd":user.pass
    },secret);
}

module.exports={
    getuser,setuser
};

