const db = require("../models")



// create a main model
const Product = db.products
const User = db.users


//  1. create product
const addProduct = async (req,res) =>{

    // try {

    let info = {
    title: req.body.title,
    description: req.body.description
}

    if(!info.title || !info.description){
        
        res.status(400).send({message:"please fill the credentials"})

    }else{
        const product = await Product.create(info)
        
        res.status(200).send(product)
    }

    // } catch (error) {
        
    //     res.status(400).send("error")
    // }
}


// 2. get all products
const getAllProducts =  async (req,res) =>{

    try {
            let products = await Product.findAll({})

            if(products){
                
                res.status(200).send(products)
            }else{
                res.status(400).send({message:"no data found"})
                
            }
          
    } catch (error) {
        res.status(400).send("no data found")
        
    }
}


// 3. get single product
const getOneProduct =  async (req,res) =>{

    try {

        let id = req.params.id
        let product = await Product.findOne({ where: { id:id }})

        if(product){

            res.status(200).send(product)
        }else{
            res.status(400).send({message:"no data found"})
        }
    } catch (error) {
        res.status(200).send("something wrong....")
    }

}

// 4. update product
const updateProduct =  async (req,res) =>{

    try {

        let id = req.params.id

        let product = await Product.update(req.body, { where: { id:id }})
    
        res.status(200).send(product)
        
    } catch (error) {
        res.status(200).send("something wrong....")
    }


}


// 5. delete product
const deleteProduct =  async (req,res) =>{

    try {
        let id = req.params.id
        
        let data = await Product.findOne({ where: { id:id }})

        if(data){

            let product = await Product.destroy({ where: { id:id }})
        
            res.status(200).send({message:'product is deleted'})
        }else{
            res.status(200).send({message:'product not found'})

        }
    

    } catch (error) {

        res.status(200).send("something wrong....")
    }


}



module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}