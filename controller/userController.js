const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const value = require("../controller/callApi.js");
const checkAuth = require("../middleware/auth.js");

// create a main model

const User = db.users;

//BCRYPT PASSWORD USE THIS METHOD START
const secure = async (password) => {
  try {
    const passwordhash = await bcrypt.hash(password, 10);
    return passwordhash;
  } catch (error) {
    res.status(400).send({ message: "error" });
  }
};

// create token...

const createtoken = async (id, res) => {
  try {
    // const tokn = await Jwt.sign({ _id: id }, config.secret)
    const tokn = await jwt.sign({ _id: id }, "privatekey", {
      expiresIn: "1s",
    });

    return tokn;
  } catch (error) {
    res.send("error");
  }
};

// 1. register api user....
const addUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const spassword = await secure(req.body.password);

    const user = new User({
      first_name,
      last_name,
      email,
      password: spassword,

      isVarified: req.body.isVarified ? req.body.isVarified : false,
      isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
    });

    const userdata = await User.findOne({ where: { email: req.body.email } });

    if (userdata) {
      res.status(400).send({ error: "user already exist" });
    } else {
      const userdata1 = await user.save();

      res.status(200).send({ message: "welcome", userdata1 });
    }
  } catch (error) {
    res.status(401).send({ message: "error something wrong" });
  }
};

// 2. login api user..........
let refreshTokens = [''];
const addUserLogin = async (req, res, next) => {
  // try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: "please fill the proper field " });
    } else {
      let user = await User.findOne({ where: { email: req.body.email } });

      if (!user) {
        return res.status(404).send({ error: "invalid email" });
      } else if (user.isVarified === false) {
        res.status(400).send({ error: "please verify" });
      } else {
        const checkpassword = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (!checkpassword) {
          return res.status(404).send({ error: "invalid password" });
        }
        const token = await createtoken(user.id);

        let refreshToken = jwt.sign(user.id,"privatekey");

        refreshTokens.push(refreshToken);

        let Id = user.id;
        res.status(200).send({ success: "😉welcome user..!!",refreshToken, token, Id });
      }
    }
  // } catch (error) {
  //   res.status(401).send({ message: "error something wrong" });
  // }
};

// 3. get all users....
const getAllUsers = async (req, res) => {
  try {
    let users = await User.findAll({});

    if (users) {
      res.status(200).send(users);
    } else {
      res.status(400).send({ message: "no data found" });
    }
  } catch (error) {
    res.status(400).send("no data found");
  }
};

// 4. get single user
const getOneUser = async (req, res) => {
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
};

// 5. delete user
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;

    let data = await User.findOne({ where: { id: id } });

    if (data) {
      let user = await User.destroy({ where: { id: id } });

      res.status(200).send({ message: "user is deleted" });
    } else {
      res.status(400).send({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).send("error");
  }
};

// 6. update user
const updateUser = async (req, res) => {
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
          message: "User Updated successfully",
        });
        
      } else {
        res.status(400).send("error");
      }
    }
  } catch (error) {
    res.status(400).send("error");
  }
};


// 7. change password
const changePassword = async (req, res) => {
  try {
    let id = req.params.id;

    let password = req.body.password;

    if (password != undefined) {
      bcrypt.hash(password, 10).then((hash) => {
        User.update(
          {
            password: hash,
          },
          { where: { id: id } }
        );

        res.status(200).send({ message: "Password updated..." });
      });
    } else {
      res.status(400).send({ message: "Password not updated..." });
    }
  } catch (error) {
    res.status(400).send({ message: "something wrong" });
  }
};


// 8. refresh token 

const refreshToken = async (req,res)=>{

  const refreshToken = req.body.token;

  jwt.verify(refreshToken, "privatekey",async (err, user) => {
      if (!err) {
        
          const accessToken = jwt.sign(user,"privatekey");
          return res.json({ success: true, accessToken });
      } else {
          return res.json({
              success: false,
              message: "Invalid refresh token"
          });
      }
  });
}

module.exports = {
  addUser,
  addUserLogin,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  changePassword,
  refreshToken
};
