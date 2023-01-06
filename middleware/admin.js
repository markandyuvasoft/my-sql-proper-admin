const jwt = require('jsonwebtoken');
const db = require("../models")


// create a main model

const User = db.users;

const adminauth= async (req,res,next)=>{

  const {authorization} = req.headers

  if(!authorization){
     return res.status(401).json({error:"only auth"})
  }
  const token = authorization.replace("Bearer ","")
 
  jwt.verify(token, 'privatekey', (err, authData)=>{
    
    if(err){
        res.json({
            message: "Invalid Token..."
          });

    } else{
        
        
       const role = authData.isAdmin;

       if(role === true){

        next();
       } else{
           return res.json({
               message: "Access Denied! you are not an Admin"
             });

       }
    }
})

        
}

module.exports = {
    
    adminauth
}