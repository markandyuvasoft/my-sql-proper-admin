module.exports = (sequelize, DataTypes) => {


    const Product = sequelize.define("product", {
        
        image: {
            type: DataTypes.STRING,
        },
        // cloudinary_id: {
        //     type: DataTypes.STRING,
        // },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.STRING
        }
    })

    return Product
}