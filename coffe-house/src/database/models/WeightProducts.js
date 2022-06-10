module.exports = (sequelize, dataTypes) => {

    const alias = "WeightProducts";
    const columns = {
        id: dataTypes.INTEGER,
        id_product: {
            type: dataTypes.INTEGER,
            references: {
                model:'Products',
                key:'id'
            }
        },
        id_weight: {
            type: dataTypes.INTEGER,
            references:{
                model:'Weight',
                key:'id'
            }
        }
	}

    const config = {
        tableName: "weight_products",
        timestamps: false,
    };

    const WeightProduct = sequelize.define(alias, columns, config);

    WeightProduct.associate = (models) => {
        WeightProduct.belongsTo(models.Products, {          
          foreignKey: "id_product",
        });
        WeightProduct.belongsTo(models.Weight, {          
            foreignKey: "id_weight",
          });
        }
        
        return WeightProduct;
}