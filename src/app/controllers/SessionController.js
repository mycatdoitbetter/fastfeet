import jwt from "jsonwebtoken";
import User from "../models/User";
import authConfig from "../../config/auth";
class SessionController {
  async store(require, response) {
    const { email, password } = require.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return response.status(401).json({ error: "User not found." });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: "User does not match" });
    }

    const { id, name } = user;

    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
