const joi = require('@hapi/joi')

const schema= {

    user: joi.object({
    first_name: joi.string().max(100).required(),
    last_name: joi.string().max(100).required(),
    email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }),
    password:joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    isAdmin:joi.boolean(),

})
}

module.exports={

    schema
    
}