import jwt from "jsonwebtoken";
import User from "../models/User";
import File from "../models/File";

import authConfig from "../../config/auth";
class SessionController {
  async store(require, response) {
    const { password, cpf } = require.body;

    const user = await User.findOne({
      where: { cpf },
      
    //   attributes: ["id", "name", "email", "cpf"],
    //   include: [
    //     { model: File, as: "avatar", attributes: ["name", "path", "url"] },
    //   ],
    });
    if (!user) {
      return response.status(401).json({ error: "User not found." });
    }
    if (!(await user.checkPassword(password))) {
      return response
        .status(401)
        .json({ error: "The password does not match" });
    }

    const userStats = await User.findOne({
        where: { cpf },
        
        attributes: ["id", "name", "email", "cpf"],
        include: [
          { model: File, as: "avatar" },
        ],
      });

    const { id,} = user;
  
    return response.json({
      user: userStats,
      token: jwt.sign( {id} , authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
