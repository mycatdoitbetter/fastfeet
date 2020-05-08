module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: "hermes",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
