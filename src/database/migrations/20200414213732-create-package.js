"use strict";
/**
 * 
signature_id (referência à uma assinatura do destinatário, que será uma imagem);
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("packages", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNul: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNul: false,
      },
      deliveryman_id: {
        type: Sequelize.INTEGER,
        references: { model: "deliverymans", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNul: true,
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        references: { model: "recipients", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNul: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("packages");
  },
};
