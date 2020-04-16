import * as Yup from "yup";
import { startOfHour, parseISO, isBefore, format, subHours } from "date-fns";
import pt from "date-fns/locale/pt";
import Deliveryman from "../models/Deliveryman";
import Recipients from "../models/Recipients";
import Package from "../models/Package";
class PackageController {
  async store(require, response) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });
    const { product, deliveryman_id, recipient_id } = await require.body;

    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }

    const deliveryman = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });

    if (!deliveryman) {
      return response.status(400).json({ error: "Deliveryman doesnt exists." });
    }
    const recipient = await Recipients.findOne({
      where: { id: recipient_id },
    });

    if (!recipient) {
      return response.status(400).json({ error: "Recipient doesnt exists." });
    }
    console.log(Package);

    const pack = await Package.create({
      product,
      deliveryman_id,
      recipient_id,
    });

    return response.json(pack);
  }
  async list(require, response) {
    return response.json({ list: true });
  }
  async delete(require, response) {
    return response.json({ delete: true });
  }
  async update(require, response) {
    return response.json({ update: true });
  }
}
export default new PackageController();
