import User from "../models/User";
import File from "../models/File";
import { Op } from "sequelize";
import * as Yup from "yup";
class UserController {
  async store(require, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().length(14).required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }
    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }
    const isProvider = await User.findOne({where : {id: require.userId, provider: true}})

    if (!isProvider) {
        // console.log(require.isProvider);
      return response.status(401).json({
        error: "Only providers can regist a new user",
      });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: require.body.email }, { cpf: require.body.cpf }],
      },
    });

    if (user) {
      return response.status(400).json({ error: "User already exists" });
    }

    const { id, name, email, provider } = await User.create(require.body);

    return response.json({ id, name, email, provider });
  }
  async update(require, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }

    const user = await User.findByPk(require.userId);

    if (require.body.email && require.body.email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        response.status(400).json({ error: "Email already exists." });
      }
    }

    if (
      require.body.oldPassword &&
      !(await user.checkPassword(require.body.oldPassword))
    ) {
      return response.status(401).json({ error: "Passwords does't match" });
    }

    await user.update(require.body);

    const updated = await User.findByPk(require.userId, {
      attributes: ["id", "name", "email", "cpf"],
      include: [
        {
          model: File,
          as: "avatar",
          attributes: ["name", "id", "path", "url"],
        },
      ],
    });

    return response.json(updated);
  }
  async list(require, response) {
    const providerId = require.userId;
    const isProvider = require.query.provider === "true";

    const provider = User.findOne({
      where: { id: providerId, provider: true },
    });

    if (!provider) {
      return response
        .status(401)
        .json({ error: "Only providers can list the users" });
    }

    const users = await User.findAll({
      where: { provider: isProvider },
      attributes: ["id", "name", "email", "cpf"],
      include: [
        { model: File, as: "avatar", attributes: ["name", "path", "url"] },
      ],
    });

    return response.json({ users });
  }
}
export default new UserController();
