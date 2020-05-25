import File from "../models/File";

class FileController {
  async store(require, response) {
    const { filename: path, originalname: name } = require.file;

    const file = await File.create({ name, path });

    return response.json(file);
  }
  async getURL(require, response) {

    const file = await File.findOne({ where: {id: require.query.id} });

    return response.json(file.url);
  }
}

export default new FileController();
