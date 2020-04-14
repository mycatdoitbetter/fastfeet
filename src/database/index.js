import Sequelize from "sequelize";

import databaseConfig from "../config/database";
import User from "../app/models/User";
import Recipients from "../app/models/Recipients";
import Deliveryman from "../app/models/Deliveryman";
import File from "../app/models/File";

const models = [User, Recipients, File, Deliveryman];
class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    User.associate(this.connection.models);
    Deliveryman.associate(this.connection.models);
  }
}

export default new Database();
