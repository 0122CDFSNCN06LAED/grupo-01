module.exports = (sequelize, dataTypes) => {

    const alias = "UserCategories";
    const columns = {
        id: {primaryKey: true,
            type: dataTypes.INTEGER,
          autoIncrement: true},
        type: dataTypes.STRING
	}

    const config = {
        tableName: "user_category",
        timestamps: false,
    };

    const UserCategory = sequelize.define(alias, columns, config);

    // relaciones
    //UNA CATEGORIA TIENE MUCHOS USUARIOS
    UserCategory.associate = (models) => {
        UserCategory.hasMany(models.Users, {           
          as: "users",
          foreignKey: "user_category_id",
        });
    };
    return UserCategory;
  
}