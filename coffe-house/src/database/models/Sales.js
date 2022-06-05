module.exports = (sequelize, dataTypes) => {

    const alias = "Sales";
    const columns = {
        
        id: datatypes.INTEGER,
        
	      id_users: datatypes.INTEGER,
	     

        
    };
  
    const config = {
      tableName: "sales",
      timestamps: false,
    };
  
    const Sales = sequelize.define(alias, columns, config);
  
    // relaciones


    Sales.associate = (models) => {
        Sales.belongsToMany(models.Users, {
        as: "Users",
        through: "user_sale",
        foreignKey: "id_user",
        otherKey: "id_product_sale",
        timestamps:false,
    });

   

    return Sales;
  
};