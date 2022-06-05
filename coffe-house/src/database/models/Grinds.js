module.exports = (sequelize, dataTypes) => {

    const alias = "Grinds";
    const columns = {
	id: datatypes.INTEGER,
	name: datatypes.STRING
	}

    const config = {
        tableName: "grinds",
        timestamps: false,
    };

    const Grinds = sequelize.define(alias, columns, config);

    // relaciones

    // un producto tiene muchos granos
    // un grano puede estar en muchos prpductos
    
    return Grinds;
  
}