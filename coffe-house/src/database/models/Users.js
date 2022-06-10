module.exports = (sequelize, dataTypes) => {

    const alias = "Users";
    const columns = {
        
        id: dataTypes.INTEGER, //Int unsigned autoincrement Not Null,
        name: dataTypes.STRING, //Varchar(255) Not null,
        lastname: dataTypes.STRING,
        email: dataTypes.STRING,
        username: dataTypes.STRING,
        password: dataTypes.STRING,
        rePassword: dataTypes.STRING,
        image: dataTypes.STRING
         
    };
  
    const config = {
      tableName: "users",
      timestamps: false,
    };
  
    const User = sequelize.define(alias, columns, config);
    //UN USER PERTENECE A UNA CATEGORIA
    User.associate = (models) => {
      User.belongsTo(models.Category, {           //pertenece a una sola categoría.
        as: "category",
        foreignKey: "category_id",
      });
  
      //UN USER PUEDE COMPRAR MUCHOS PRODUCTOS
      User.belongsToMany(models.Products, {           //tabla intermedia 
        as: "products",
        through: "products_users",
        foreignKey: "id_user",
        otherKey: "id_product",
        timestamps: false,
      });
   
      
    };
    return User;
  
};