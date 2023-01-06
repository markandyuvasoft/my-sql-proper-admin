
const {schema,user}= require('../validation/auth-Schema.js')



const adduservali=async(req,res,next) =>{

    const value= await schema.user.validate(req.body)

    if(value.error){
        // res.json({
        //     success:0,
        //     message:value.error.details[0].message
        // })
        res.status(400).send({message:value.error.details[0].message})
    }else{

        next()
    }
}

module.exports= {
    
    adduservali
} 