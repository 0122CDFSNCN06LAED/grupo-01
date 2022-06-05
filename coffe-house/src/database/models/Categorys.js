module.exports = (sequelize, dataTypes) => {

    const alias = "Categorys";
    const columns = {
        id: datatypes.INTEGER,
        name: datatypes.STRING
	}

    const config = {
        tableName: "categorys",
        timestamps: false,
    };

    const Categorys = sequelize.define(alias, columns, config);

    // relaciones

    // un producto tiene muchas categorias
    // una categorya pertenece a varios prpductos
    
    return Categorys;
  
}


Categorys ={
	
	}