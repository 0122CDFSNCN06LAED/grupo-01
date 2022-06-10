module.exports = (sequelize, dataTypes) => {

    const alias = "GrindsProducts";
    const columns = {
        id: dataTypes.INTEGER,
        id_product: {
            type: dataTypes.INTEGER,
            references: {
                model:'Products',
                key:'id'
            }
        },
        id_grind: {
            type: dataTypes.STRING,
            references:{
                model:'Grinds',
                key:'id'
            }
        }
	}

    const config = {
        tableName: "grinds_products",
        timestamps: false,
    };

    const GrindProduct = sequelize.define(alias, columns, config);

    GrindProduct.associate = (models) => {
        GrindProduct.belongsTo(models.Products, {          
          foreignKey: "id_product",
        });
        GrindProduct.belongsTo(models.Grinds, {          
            foreignKey: "id_grind",
          });
        }
        
        return GrindProduct;
}