const db = require("../models");

// image update use
const multer = require("multer");
const path = require("path");
const fileUpload = require("express-fileupload");
var cloudinary = require('cloudinary').v2;
var dotenv=require('dotenv').config()


// create a main model
const Product = db.products;
const User = db.users;

// dotenv.config()

//CLOUD CONDITIONS..................
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})


//  1. create product....
const addProduct = async (req, res) => {

  try {

    let image = req.file.path

    let { title, description } = req.body;
    
      const result = await cloudinary.uploader.upload(image)
    
      // console.log(result);
    
      if (!title || !description) {
        
        res.status(400).send({ message: "please fill the credentials" });
      }else{
    
        const product = await Product.create({
          title,
          description,
          image: result.secure_url, version_id: result.public_id,
        });
        
        res.status(200).send(product);
      }
  } catch (error) {
    
    res.status(400).send({message:"error"});
  }
};

// 2. get all products
const getAllProducts = async (req, res) => {
  try {
    let products = await Product.findAll({});

    if (products) {
      
      res.status(200).send(products);
    } else {
      res.status(400).send({ message: "no data found" });
    }
  } catch (error) {
    res.status(400).send("no data found");
  }
};

// 3. get single product
const getOneProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findOne({ where: { id: id } });

    if (product) {
      res.status(200).send(product);
    } else {
      res.status(400).send({ message: "no data found" });
    }
  } catch (error) {
    res.status(200).send("something wrong....");
  }
};

// 4. update product

const updateProduct = async (req, res) => {

let image = req.file.path

let id= req.params.id

let { title, description } = req.body;

let user = await Product.findOne({ where: { id: id } });


const destroy = await cloudinary.uploader.destroy(image);

  let result;

  if (destroy) {
       result = await cloudinary.uploader.upload(image)
    }
    const data = {
      title,
      description,
      image: result.secure_url, version_id: result.public_id,
    };

   user = await Product.update(data, { where: { id: id } });

   res.status(200).send({ status: "success", updateDetails: user });

};

// 5. delete product
const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;

    let data = await Product.findOne({ where: { id: id } });

    if (data) {
      let product = await Product.destroy({ where: { id: id } });

      res.status(200).send({ message: "product is deleted" });
    } else {
      res.status(200).send({ message: "product not found" });
    }
  } catch (error) {
    res.status(200).send("something wrong....");
  }
};

// 6. upload image

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
// })
}).single("image");



module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  upload,
};
