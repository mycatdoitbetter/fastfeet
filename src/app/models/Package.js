import { Model, Sequelize } from "sequelize";

export default class Package extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: "recipient_id",
      as: "recipients",
    });

    this.belongsTo(models.User, {
      foreignKey: "deliveryman_id",
      as: "deliveryman",
    });
  }
}
