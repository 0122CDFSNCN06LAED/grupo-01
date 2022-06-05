module.exports = (sequelize, dataTypes) => {

    const alias = "Products";
    const columns = {
        
        id: datatypes.INTEGER,
        name: datatypes.STRING,
        Description: datatypes.STRING,
        price: Decimal,
        region: datatypes.STRING,   // varchar()???
        image: Blob,
	      id_categorys: datatypes.INTEGER,
	      id_grinds: datatypes.INTEGER,
        id_weight:datatypes.INTEGER,

        
    };
  
    const config = {
      tableName: "products",
      timestamps: false,
    };
  
    const Products = sequelize.define(alias, columns, config);
  
    // relaciones


    Products.associate = (models) => {
        Products.hasMany(models.Users, {
        as: "Users",
        through: "user_product",
        foreignKey: "id_product",
        otherKey: "id_user",
        timestamps:false,
    });

   

    return Products;
  
    }
}