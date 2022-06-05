module.exports = (sequelize, dataTypes) => {

    const alias = "Users";
    const columns = {
        
        id: datatypes.INTEGER, //Int unsigned autoincrement Not Null,
        name: datatypes.STRING, //Varchar(255) Not null,
        lastname: datatypes.STRING,
        email: datatypes.STRING,
        username: datatypes.STRING,
        password: datatypes.STRING,
        rePassword: datatypes.STRING,
        //  image: 
    };
  
    const config = {
      tableName: "users",
      timestamps: false,
    };
  
    const Users = sequelize.define(alias, columns, config);
  
    // relaciones
    return Users;
  
};