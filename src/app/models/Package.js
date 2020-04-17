import { Model, Sequelize } from "sequelize";
import { isBefore, subHours } from "date-fns";
export default class Package extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,

        canceled_at: Sequelize.DATE,
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

    this.belongsTo(models.Deliveryman, {
      foreignKey: "deliveryman_id",
      as: "deliveryman",
    });
  }
}