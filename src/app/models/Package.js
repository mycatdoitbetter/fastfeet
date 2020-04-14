import { Model, Sequelize } from "sequelize";
import { isBefore, subHours } from "date-fns";
export default class Package extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        // start_date: Sequelize.DATE,
        // end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Deliveryman, {
      foreignKey: "deliveryman_id",
      as: "deliveryman",
    });
    this.belongsTo(models.File, {
      foreignKey: "recipient_id ",
      as: "recipient",
    });
  }
}
