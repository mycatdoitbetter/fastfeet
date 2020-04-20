"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      "users",
      [
        {
          name: "Distribuidora FastFeet",
          cpf: "123.123.123-11",
          email: "distribuidora@gmail.com",
          password_hash: bcrypt.hashSync("123456", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
