import { Model, Sequelize } from "sequelize";
import bcrypt from "bcryptjs";

export default class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (deliveryman) => {
      if (deliveryman.password) {
        deliveryman.password_hash = await bcrypt.hash(deliveryman.password, 8);
      }
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "avatar_id", as: "avatar" });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
