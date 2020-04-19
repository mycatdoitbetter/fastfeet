import * as Yup from "yup";
import Deliveryman from "../models/Deliveryman";
import File from "../models/File";
import User from "../models/User";

class DeliverymanController {
  async store(require, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().length(14).required(),
    });

    const provider = User.findByPk(require.userId);
    if (!provider) {
      return response
        .status(400)
        .json({ error: "only providers can create a deliveryman" });
    }

    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }

    const deliveryman = await Deliveryman.findOne({
      where: { cpf: require.body.cpf },
    });

    if (deliveryman) {
      return response
        .status(400)
        .json({ error: "Deliveryman already exists." });
    }

    const { id, name, cpf } = await Deliveryman.create(require.body);

    return response.json({ id, name, cpf });
  }
  async update(require, response) {
    const schema = Yup.object().shape({
      cpf: Yup.string(),
      avatar_id: Yup.number(),
    });

    const provider = User.findByPk(require.userId);
    if (!provider) {
      return response
        .status(400)
        .json({ error: "only providers can update a deliveryman" });
    }

    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }

    const deliveryman = await Deliveryman.findByPk(require.params.id, {
      attributes: ["id", "cpf", "name", "avatar_id"],
      include: [
        { model: File, as: "avatar", attributes: ["name", "path", "url"] },
      ],
    });
    if (!deliveryman) {
      return response.status(401).json({ error: "deliveryman has not found" });
    }

    await deliveryman.update(require.body);

    return response.json(deliveryman);
  }
  async delete(require, response) {
    const provider = User.findByPk(require.userId);
    if (!provider) {
      return response
        .status(400)
        .json({ error: "only providers can delete a deliveryman" });
    }
    const deliveryman = await Deliveryman.findByPk(require.params.id);
    Deliveryman.destroy({ where: { id: require.params.id } });
    if (!deliveryman) {
      return response.status(404).json({
        error: `The deliveryman has not found`,
      });
    }
    return response.json({
      ok: `The deliveryman deleted was ${deliveryman.name}`,
    });
  }
  async list(require, response) {
    const provider = User.findByPk(require.userId);
    if (!provider) {
      return response
        .status(400)
        .json({ error: "only providers can list deliverymans" });
    }
    const deliveryman = await Deliveryman.findAll({
      attributes: ["id", "cpf", "name", "avatar_id"],
      include: [
        { model: File, as: "avatar", attributes: ["name", "path", "url"] },
      ],
    });
    return response.json(deliveryman);
  }
}

export default new DeliverymanController();
