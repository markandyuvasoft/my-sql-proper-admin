// const db = require("../models")
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const checkAuth = require("../middleware/auth.js");

// const User = db.users;

// // same login user and admin use this function............


// const callApi =async (req, res) =>{

//   // console.log("3445",req);
//       let users = await User.findAll({});
      
//       User.findOne({ where: {email: req.body.email } })
//           .then((user) => {
//             if (user === null) {
//               res.status(401).json({
//                 message: "Invalid credentials!",
//               });

//             } else {
//               bcrypt.compare(
//                 req.body.password,
//                 user.password,
//                 function (err, result) {
//                   if (result) {
//                     const token = jwt.sign(
//                       {
//                         email: user.email,
//                         userId: user.id,
//                       },
//                       "itsajwttoken",
//                       function (err, token) {
//                         res.status(200).json({
//                           message: "Authentication successful Welcome Admin!",
//                           token: token,
//                         });
//                       }
//                     );
//                   } else {
//                     res.status(401).json({
//                       message: "Invalid credentials!",
//                     });
//                   }
//                 }
//               );
//             }
//           })
//           .catch((error) => {
//             res.status(500).json({
//               message: "Something went wrong!",
//             });
//           });
//   }

// module.exports={callApi}
