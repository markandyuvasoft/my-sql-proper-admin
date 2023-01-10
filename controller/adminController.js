const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create a main model

const User = db.users;

const generateTokens = async function (id, isAdmin) {
  const token = jwt.sign({ id: id, isAdmin: isAdmin }, "privatekey", {
    expiresIn: "24h",
  });
  return token;
};

// 1. admin login api........

const loginAdmin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userdata = await User.findOne({ where: { email: email } });

    if (userdata) {
      const passwordmatch = await bcrypt.compare(password, userdata.password);

      if (passwordmatch) {
        if (userdata.isAdmin === false) {
          res.status(400).send({ error: "you are not admin" });
        } else if (userdata.isVarified === false) {
          res.status(400).send({ error: "you block by super admin" });
        } else {
          const checkpassword = await bcrypt.compare(
            req.body.password,
            userdata.password
          );

          const token = await generateTokens(userdata.id, userdata.isAdmin);

          // console.log(token);

          let Id = userdata.id;

          res.status(200).send({ success: "😉welcome admin..!!", token, Id });
        }
      } else {
        res.status(400).send({ error: "please try again" });
      }
    } else {
      res.status(400).send({ error: "please try again" });
    }
  } catch (error) {
    res.status(401).send({ message: "error something wrong" });
  }
};

// 2. get the admin details.....

const getAdmin = async (req, res) => {

try {

  let users = await User.findAll({});

  const unique = users.filter((val) => val.isAdmin);

  const data = unique[0].dataValues.isAdmin;

  if (data === true) {
    
      res.status(200).send(unique);

    } else{
      res.status(400).send({message:"no record found"});
  }
  
} catch (error) {
  res.status(400).send({message:"no record found"});
  
}

};


// 3. update admin details........

const updateAdmin = async (req,res)=>{

  try {

    let {first_name,last_name,email}= req.body
  
      if(first_name.length === 0 || last_name.length === 0 || email.length === 0 ){
  
        res.status(400).send({message:"This is an empty value"});
  
      }else{
  
        let id = req.params.id;
        
        let user = await User.findOne({ where: { id: id } });
        
        const users = {
          first_name,last_name,email,
        };
        
        if (user) {
          User.update(req.body, { where: { id: id } });
          res.status(201).json({
            message: "Admin Updated successfully",
          });
          
        } else {
          res.status(400).send("error");
        }
      }
    } catch (error) {
      res.status(400).send("error");
    }
}


// 4. delete admin details.....

const deleteAdmin = async (req,res)=>{

  try {
    let id = req.params.id;

    let data = await User.findOne({ where: { id: id } });

    if (data) {
      let user = await User.destroy({ where: { id: id } });

      res.status(200).send({ message: "admin is deleted" });
    } else {
      res.status(400).send({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).send("error");
  }
}

// 5. get the admin by id......

const getSingleAdmin = async (req,res)=>{

  try {
    let id = req.params.id;
    let user = await User.findOne({ where: { id: id } });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send({ message: "no data found" });
    }
  } catch (error) {
    res.status(200).send("no data found");
  }
}

module.exports = {
  loginAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getSingleAdmin
};
