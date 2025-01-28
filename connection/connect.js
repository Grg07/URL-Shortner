const mongo =require("mongoose");

 mongoconnect=(url)=>{
    mongo.connect(url).then(()=>{
        console.log("Database Connected")
    }).catch((err)=>{
        console.log("Database connection failed",err)
    });
}

module.exports={
    mongoconnect
};