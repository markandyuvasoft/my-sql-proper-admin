const db = require("../models");

// image update use
const multer = require("multer");
const path = require("path");

// create a main model
const Product = db.products;
const User = db.users;

//  1. create product

const addProduct = async (req, res) => {
  try {
    let { title, description } = req.body;

    let image = req.file;

    if (!info.title || !info.description) {
      res.status(400).send({ message: "please fill the credentials" });

    } else {
      const product = await Product.create({
        title,
        description,
        image: req.file.path,
      });

      res.status(200).send(product);
    }

  } catch (error) {
    res.status(400).send("error");
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
// const updateProduct = async (req, res) => {
//   // try {

//   let id = req.params.id;

//   const title = req.body;

//   const description = req.body;

//   const image = req.file;

//   let product = await Product.update(image, { where: { id: id } });

//   console.log(product);

//   // res.status(200).send(product)

//   // } catch (error) {
//   //     res.status(200).send("something wrong....")
//   // }
// };




const updateProduct = async (req, res) => {

let id = req.params.id;

const title = req.body;

const description = req.body;

const image = req.file;

let product = await Product.update(image, { where: { id: id } });

console.log(product);

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
}).single("image");

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  upload,
};
