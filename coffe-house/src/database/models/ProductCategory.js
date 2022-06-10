module.exports = (sequelize, dataTypes) => {

    const alias = "ProductCategories";
    const columns = {
        id: dataTypes.INTEGER,
        type: dataTypes.STRING
	}

    const config = {
        tableName: "product_category",
        timestamps: false,
    };

    const ProductCategory = sequelize.define(alias, columns, config);

    // relaciones
//UNA CATEGORIA TIENE MUCHOS PRODUCTOS
    ProductCategory.associate = (models) => {
        ProductCategory.hasMany(models.Products, {           //tiene muchos productos.
          as: "products",
          foreignKey: "category_id",
        });
    };
    return ProductCategory;
  
}
