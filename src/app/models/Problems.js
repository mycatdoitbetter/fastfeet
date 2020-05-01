import { Model, Sequelize } from "sequelize";

export default class Problems extends Model {
  static init(sequelize) {
    super.init(
      {
        package_id: Sequelize.INTEGER,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Package, {
      foreignKey: "package_id",
      as: "packages",
    });
  }
}
