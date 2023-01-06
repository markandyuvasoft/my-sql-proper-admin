// const jwt = require('jsonwebtoken');


// module.exports = (sequelize, DataTypes) => {


//     const User = sequelize.define("user", {

//         first_name: {
//             type: DataTypes.STRING,
//             allowNull: true
//         },

//         last_name: {
//             type: DataTypes.STRING
//         },

//         email: {
//             type: DataTypes.STRING
//         },

//         password: {
//             type: DataTypes.STRING
//         },

//         isVarified: {
//             type: DataTypes.BOOLEAN
//         },

//         isAdmin : {
//             type: DataTypes.BOOLEAN
//         }
//     })

//     return User

// } 


const jwt = require('jsonwebtoken');


module.exports = (sequelize, DataTypes) => {


    const User = sequelize.define("user", {

        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },

        last_name: {
            type: DataTypes.STRING
        },

        email: {
            type: DataTypes.STRING
        },

        password: {
            type: DataTypes.STRING
        },

        isVarified: {
            type: DataTypes.BOOLEAN
        },

        isAdmin : {
            type: DataTypes.BOOLEAN
        }
    })

    return User

} 