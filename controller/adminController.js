const db = require("../models")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


// create a main model

const User = db.users;

const generateTokens = async function (id,isAdmin){

  const token= jwt.sign({id:id, isAdmin:isAdmin},'privatekey',{

      expiresIn:"24h"
  })
  return token
}


// const loginAdmin = async (req, res, next) => {

//   try {
//     const email = req.body.email
//     const password = req.body.password
  
//     const userdata = await User.findAll({ })
  
//     const unique = userdata.filter((val) => val.email === req.body.email);
  
    
//     if (userdata) {
  
//       let user = await User.findOne({where:{ email: req.body.email }})
  
//        if (!user) {
  
//         return res.status(404).send({ error: "invalid email" })
//       }
  
//       const passwordmatch = await bcrypt.compare(password, unique[0].dataValues.password)
   
//       if (passwordmatch) {
  
//         if (unique[0].dataValues.isAdmin === false) {
  
//           res.status(400).send({ error: "you are not admin" })
        
//         }else {
  
//           // const token = await generateTokens(unique[0].dataValues.id)
//           const token = await generateTokens(unique[0].dataValues.id)

  
//           let Id = unique[0].dataValues.id
  
//           res.status(200).send({ success: "😉welcome admin..!!", token, Id })
//         }
  
//       } else {
//         res.status(400).send({ error: "please try again" })
//       }
   
//     } else {
//       res.status(400).send({ error: "please try again" })
//     }

    
//   } catch (error) {
//     res.status(400).send({ error: "please try again" })
//   }

//   };


const loginAdmin = async (req,res,next) => {

  const email = req.body.email
  const password = req.body.password

  const userdata = await User.findOne({ where:{ email: email }})


  if (userdata) {
    const passwordmatch = await bcrypt.compare(password, userdata.password)

    if (passwordmatch) {
      if (userdata.isAdmin === false) {

        res.status(400).send({ error: "you are not admin" })

      } else if (userdata.isVarified === false) {

        res.status(400).send({ error: "you block by super admin" })

      }
      else {
        const checkpassword = await bcrypt.compare(req.body.password, userdata.password);

        const token = await generateTokens(userdata.id,userdata.isAdmin)

        // console.log(token);

        let Id = userdata.id

        res.status(200).send({ success: "😉welcome admin..!!", token, Id })
      }

    } else {
      res.status(400).send({ error: "please try again" })
    }

  } else {
    res.status(400).send({ error: "please try again" })
  }
}
  


module.exports = {
    loginAdmin,
    
}