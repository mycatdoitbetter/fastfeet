import jwt from "jsonwebtoken";
import User from "../models/User";
// import Deliveryman from "../models/Deliveryman";

import authConfig from "../../config/auth";
class SessionController {
  async store(require, response) {
    const { password, cpf } = require.body;

    const user = await User.findOne({
      where: { cpf },
    });
    if (!user) {
      return response.status(401).json({ error: "User not found." });
    }
    if (!(await user.checkPassword(password))) {
      return response
        .status(401)
        .json({ error: "The password does not match" });
    }

    const { id, name } = user;
    return response.json({
      user: {
        id,
        name,
        cpf,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
