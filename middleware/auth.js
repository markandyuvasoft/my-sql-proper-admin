


const jwt = require('jsonwebtoken');
const db = require("../models")

// create a main model

const User = db.users;

// const checkauth=(req,res,next)=>{
    
//     const {authorization} = req.headers

//     if(!authorization){
//        return res.status(401).json({error:"only auth"})
//     }
//     const token = authorization.replace("Bearer ","")
    
//     jwt.verify(token,"privatekey",(err,payload)=>{
//         if(err){
//          return   res.status(401).json({error:"only auth user"})
//         }else{
            
//             const {_id,name} = payload

//             User.findOne({where:{id:_id}}).then(userdata=>{

//                 req.user = userdata

//                 next()
//             })
//         } 
//     })
// } 



const checkauth=(req,res,next)=>{
    
    // let token = req.headers["authorization"];
    // token = token.split(" ")[1]; 
    const {authorization} = req.headers
    if(!authorization){
               return res.status(401).json({error:"only auth"})
            }
            const token = authorization.replace("Bearer ","")

    jwt.verify(token, "privatekey", async (err, user) => {
        if (user) {
            req.user = user;
            next();
        } else if (err.message === "jwt expired") {
            return res.json({
            success: false,
            message: "Access token expired"
            
        });
        
    } else {
            console.log(err);
            return res
            .status(403)
            .json({ err, message: "User not authenticated" });
        }
    });
} 


module.exports = {
    checkauth
}