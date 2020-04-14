import * as Yup from "yup";
import Deliveryman from "../models/Deliveryman";
import File from "../models/File";

class DeliverymanController {
  async store(require, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }

    const deliverymanExist = await Deliveryman.findOne({
      where: { email: require.body.email },
    });

    if (deliverymanExist) {
      response.status(400).json({ error: "Deliveryman already exists." });
    }

    const { id, name, email } = await Deliveryman.create(require.body);

    return response.json({ id, name, email });
  }
  async update(require, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }
    const deliveryman = await Deliveryman.findByPk(require.params.id);
    if (!deliveryman) {
      return response.status(401).json({ error: "deliveryman has not found" });
    }

    const deliverymanUpdated = await deliveryman.update(require.body);

    return response.json(deliverymanUpdated);
  }
  async delete(require, response) {
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
    const deliveryman = await Deliveryman.findAll({
      attributes: ["id", "email", "name", "avatar_id"],
      include: [
        { model: File, as: "avatar", attributes: ["name", "path", "url"] },
      ],
    });
    return response.json(deliveryman);
  }
}

export default new DeliverymanController();
