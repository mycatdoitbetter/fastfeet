"use strict";
/**
 * 
signature_id (referência à uma assinatura do destinatário, que será uma imagem);
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("problems", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      package_id: {
        type: Sequelize.INTEGER,
        references: { model: "packages", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNul: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNul: false,
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
    return queryInterface.dropTable("problems");
  },
};
