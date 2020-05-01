import Sequelize from "sequelize";
import mongoose from "mongoose";
import databaseConfig from "../config/database";
import User from "../app/models/User";
import Recipients from "../app/models/Recipients";
import Problems from "../app/models/Problems";

import File from "../app/models/File";
import Package from "../app/models/Package";

const models = [User, File, Recipients, Package, Problems];
class Database {
  constructor() {
    this.init();
    this.mongo();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    User.associate(this.connection.models);
    Problems.associate(this.connection.models);
    Package.associate(this.connection.models);
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://localhost:27017/fastfeet",
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
