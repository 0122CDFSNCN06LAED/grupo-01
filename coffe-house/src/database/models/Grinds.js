module.exports = (sequelize, dataTypes) => {

    const alias = "Grinds";
    const columns = {
        id: {primaryKey: true,
            type: dataTypes.INTEGER,
          autoIncrement: true},
        grind: dataTypes.STRING
	}

    const config = {
        tableName: "grinds",
        timestamps: false,
    };

    const Grind = sequelize.define(alias, columns, config);

    // relaciones
    //UNA MOLIENDA PERTENECE A MUCHOS PRODUCTOS Y UN PROD PUEDE TENER MUCHAS MOLIENDAS
    Grind.associate = (models) => {
    Grind.belongsToMany(models.Products, {           //tabla intermedia 
        as: "products",
        through: "grinds_products",
        foreignKey: "id_grind",
        otherKey: "id_product",
        timestamps: false,
      });

    }
    return Grind;
  
}
