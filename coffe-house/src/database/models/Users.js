module.exports = (sequelize, dataTypes) => {

    const alias = "Products";
    const columns = {
        
        id: datatypes.INTEGER, //Int unsigned autoincrement Not Null,
        name: datatypes.STRING, //Varchar(255) Not null,
        lastname: datatypes.STRING,
        email: datatypes.STRING,
        username: datatypes.STRING,
        password: datatypes.STRING,
        re-password: datatypes.STRING,
        //  image: 
    };
  
    const config = {
      tableName: "products",
      timestamps: false,
    };
  
    const Products = sequelize.define(alias, columns, config);
  
    // relaciones
    return Users;
  
};