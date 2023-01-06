// const jwt = require('jsonwebtoken');

// function checkAuth(req, res, next){
  
//     try{
//         const token = req.headers.authorization.split(" ")[1]; 
//         const decodedToken = jwt.verify(token, 'privatekey');
//         req.userData = decodedToken;
//         next();
//     }catch(e){
//         return res.status(401).json({
//             'message': "Invalid or expired token provided!",
//             'error':e
//         });
//     }
// }

// module.exports = {
//     checkAuth: checkAuth
// }



const jwt = require('jsonwebtoken');
const db = require("../models")



// create a main model

const User = db.users;

const checkauth=(req,res,next)=>{
    
    const {authorization} = req.headers

    if(!authorization){
       return res.status(401).json({error:"only auth"})
    }
    const token = authorization.replace("Bearer ","")
    
    jwt.verify(token,"privatekey",(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"only auth user"})
        }else{
            
            const {id} = payload

            User.findOne({where:{id:id}}).then(userdata=>{

                req.user = userdata

                next()
            })
        } 
    })
} 

module.exports = {
    checkauth
}