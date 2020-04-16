import Sequelize from "sequelize";

import databaseConfig from "../config/database";
import User from "../app/models/User";
import Recipients from "../app/models/Recipients";
import Deliveryman from "../app/models/Deliveryman";
import File from "../app/models/File";
import Package from "../app/models/Package";

const models = [User, File, Deliveryman, Recipients, Package];
class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    User.associate(this.connection.models);
    Deliveryman.associate(this.connection.models);
    Package.associate(this.connection.models);
  }
}

export default new Database();
