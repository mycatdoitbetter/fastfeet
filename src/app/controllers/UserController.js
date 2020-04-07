import User from "../models/User";
import * as Yup from "yup";
class UserController {
  async store(require, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }

    const user = await User.findOne({
      where: { email: require.body.email },
    });

    if (user) {
      response.status(400).json({ error: "User already exists" });
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

    const { email, oldPassword } = require.body;

    const user = await User.findByPk(require.userId);

    if (email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        response.status(400).json({ error: "Email already exists." });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(401).json({ error: "Passwords does't match" });
    }

    const { id, name, provider } = await user.update(require.body);

    return response.json({ id, name, email, provider });
  }
}
