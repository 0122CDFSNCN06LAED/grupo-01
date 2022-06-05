module.exports = (sequelize, dataTypes) => {

    const alias = "Weights";
    const columns = {
	id: datatypes.INTEGER,
	name: datatypes.STRING
	}

    const config = {
        tableName: "wights",
        timestamps: false,
    };

    const Weights = sequelize.define(alias, columns, config);

    // relaciones

    // un producto tiene muchos pesos
    // un peso puede estar en muchos prpductos
    
    return Weights;
  
}