module.exports = (sequelize, dataTypes) => {
  const alias = "Products";
  const columns = {
    id: dataTypes.INTEGER,
    name: dataTypes.STRING,
    description: dataTypes.STRING,
    price: dataTypes.DECIMAL,
    region: dataTypes.STRING, 
    image: dataTypes.STRING,
    //SAQUÉ WEIGHT Y GRIND PORQUE SON TABLAS PIVOT.
    category_id: dataTypes.INTEGER,
    stock: dataTypes.INTEGER
  };

  const config = {
    tableName: "products",
    timestamps: false,
  };

  const Product = sequelize.define(alias, columns, config);

  // relaciones
  //UN PROD PERTENECE A UNA CATEGORIA
  Product.associate = (models) => {
    Product.belongsTo(models.ProductCategories, {           //pertenece a una sola categoría.
      as: "productCategory",
      foreignKey: "category_id",
    });
    
    //UN PRODUCTO PUEDE SER COMPRADO POR MUCHOS USERS.
    Product.belongsToMany(models.Users, {           //tabla intermedia 
      as: "users",
      through: "products_users",
      foreignKey: "id_product",
      otherKey: "id_user",
      timestamps: false,
    });
    //UN PROD PUEDE TENER MUCHAS MOLIENDAS
    Product.belongsToMany(models.Grinds, {           //tabla intermedia 
      as: "grinds",
      through: "grinds_products",
      foreignKey: "id_product",
      otherKey: "id_grind",
      timestamps: false,
    });
  //UN PROD PUEDE TENER DISTINTOS PESOS
  Product.belongsToMany(models.Weight, {           //tabla intermedia 
    as: "weight",
    through: "weight_products",
    foreignKey: "id_product",
    otherKey: "id_weight",
    timestamps: false,
  });
    
  };
  return Product;
};
