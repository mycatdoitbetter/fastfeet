import File from "../models/File";

class FileController {
  async store(require, response) {
    const { filename: path, originalname: name } = require.file;

    const file = await File.create({ name, path });

    return response.json(file);
  }
}

export default new FileController();
