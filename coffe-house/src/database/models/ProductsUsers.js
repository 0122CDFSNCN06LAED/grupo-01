module.exports = (sequelize, dataTypes) => {

    const alias = "ProductsUsers";
    const columns = {
        id: dataTypes.INTEGER,
        id_product: {
            type: dataTypes.INTEGER,
            references: {
                model:'Products',
                key:'id'
            }
        },
        id_user: {
            type: dataTypes.INTEGER,
            references:{
                model:'Users',
                key:'id'
            }
        }
	}

    const config = {
        tableName: "products_users",
        timestamps: false,
    };

    const ProductUser = sequelize.define(alias, columns, config);

    ProductUser.associate = (models) => {
        ProductUser.belongsTo(models.Products, {          
          foreignKey: "id_product",
        });
        ProductUser.belongsTo(models.Users, {          
            foreignKey: "id_user",
          });
        }

        return ProductUser;
}