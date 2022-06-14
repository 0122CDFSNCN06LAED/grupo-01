module.exports = (sequelize, dataTypes) => {

    const alias = "Weight";
    const columns = {
        id: {primaryKey: true,
            type: dataTypes.INTEGER,
          autoIncrement: true},
        weight: dataTypes.STRING
	}

    const config = {
        tableName: "weight",
        timestamps: false,
    };

    const Weight = sequelize.define(alias, columns, config);

    // relaciones
    // UN PESO PERTENECE A MUCHOS PRODUCTOS Y UN PROD PUEDE TENER MUCHOS PESOS
    Weight.associate = (models) => {
      Weight.belongsToMany(models.Products, {
        
        as: "products",
        through: "weight_products",
        foreignKey: "id_weight",
        otherKey: "id_product",
        timestamps: false,
      });
    };
    return Weight;
  
}