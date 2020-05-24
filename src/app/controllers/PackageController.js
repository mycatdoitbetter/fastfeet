import * as Yup from "yup";
// import { startOfHour, parseISO, isBefore, format, subHours } from "date-fns";
// import pt from "date-fns/locale/pt";
import { Op } from "sequelize";

import User from "../models/User";
import Recipients from "../models/Recipients";
import Package from "../models/Package";
import File from "../models/File";

class PackageController {
  async store(require, response) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });
    const { product, deliveryman_id, recipient_id } = await require.body;
    const isProvider = await User.findOne({where : {id: require.userId, provider: true}})
    if (!isProvider) {
      return response
        .status(400)
        .json({ error: "only providers can register a new pack" });
    }

    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }

    const deliveryman = await User.findOne({
      where: { id: deliveryman_id, provider: false },
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

    

    const pack = await Package.create({
      product,
      deliveryman_id,
      recipient_id,
    });

    return response.json(pack);
  }
  async list(require, response) {
    const isProvider = await User.findOne({where : {id: require.userId, provider: true}})
    console.log(isProvider)
    if (isProvider) {
      return response.status(400).json({
        error: "This route is for deliverymans, please, use the list all route",
      });
    }

    const packs = await Package.findAll({
      where: { deliveryman_id: require.userId, canceled_at: null },
      attributes: ["id", "product", "start_date", "end_date", "canceled_at"],
      include: [
        {
          model: User,
          as: "deliveryman",
          attributes: ["id", "name"],
          include: {
            model: File,
            as: "avatar",
            attributes: ["id", "path", "url"],
          },
        },
        {
          model: Recipients,
          as: "recipients",
          attributes: [
            "id",
            "name",
            "number",
            "street",
            "complement",
            "state",
            "city",
            "cep",
          ],
        },
      ],
    });

    return response.json(packs);
  }
  async listAll(require, response) {
    const isProvider = await User.findOne({where : {id: require.userId, provider: true}})
    if (!isProvider) {
      return response
        .status(400)
        .json({ error: "only providers can list all packs" });
    }
    const appointmentPerPage = 20;
    const { page = 1 } = require.query;
    const packsAvailable = await Package.findAll({
      attributes: ["id", "product", "start_date", "end_date", "canceled_at"],
      limit: appointmentPerPage,
      offset: (page - 1) * appointmentPerPage,
      include: [
        {
          model: User,
          as: "deliveryman",
          attributes: ["id", "name"],
          include: {
            model: File,
            as: "avatar",
            attributes: ["id", "path", "url"],
          },
        },
        {
          model: Recipients,
          as: "recipients",
          attributes: [
            "id",
            "name",
            "number",
            "street",
            "complement",
            "state",
            "city",
            "cep",
          ],
        },
      ],
    });
    return response.json(packsAvailable);
  }
  async listCanceled(require, response) {
    const isProvider = await User.findOne({where : {id: require.userId, provider: true}})
    if (!isProvider) {
      return response
        .status(400)
        .json({ error: "only providers can list canceled packs" });
    }
    const appointmentPerPage = 20;
    const { page = 1 } = require.query;
    const packsCanceled = await Package.findAll({
      where: { canceled_at: { [Op.ne]: null } },
      attributes: ["id", "product", "start_date", "end_date", "canceled_at"],
      limit: appointmentPerPage,
      offset: (page - 1) * appointmentPerPage,
      include: [
        {
          model: User,
          as: "deliveryman",
          attributes: ["id", "name"],
          include: {
            model: File,
            as: "avatar",
            attributes: ["id", "path", "url"],
          },
        },
        {
          model: Recipients,
          as: "recipients",
          attributes: [
            "id",
            "name",
            "number",
            "street",
            "complement",
            "state",
            "city",
            "cep",
          ],
        },
      ],
    });
    return response.json(packsCanceled);
  }
  async updateStartDate(require, response) {



    const pack = await Package.findOne({
      where: { id: require.query.id, start_date: null, end_date: null, canceled_at: null },
    });
    if (!pack) {
      return response
        .status(401)
        .json({ error: "You can not upgrade this package or its not exist." });
    }

    const packUpdated = await pack.update({ start_date: new Date() });

    return response.json(packUpdated);
  }
  async updateEndDate(require, response) {
  

    const pack = await Package.findOne({
      where: {
        id: require.query.id,
        start_date: { [Op.ne]: null },
        end_date: null,
        canceled_at: null,
      },
    });

    if (!pack) {
      return response
        .status(401)
        .json({ error: "You can not upgrade this package or its not exist." });
    }

    const packUpdated = await pack.update({ end_date: new Date() });

    return response.json(packUpdated);
  }
  async updateCancel(require, response) {
    const isProvider  = await User.findOne({where: {id: require.userId, provider: true}});
    if (!isProvider) {
      return response
        .status(401)
        .json({ error: "Only providers can cancel a pack" });
    }
    const pack = await Package.findOne({where: {id: require.query.id, canceled_at: null}});
    if (!pack) {
      return response
        .status(401)
        .json({ error: "The package does not exist or already canceled." });
    }

    const packUpdated = await pack.update({ canceled_at: new Date() });

    return response.json({canceled: packUpdated});
  }
  async delete(require, response) {
    const provider = User.findOne({
      where: { id: require.userId, provider: true },
    });
    if (!provider) {
      return response
        .status(400)
        .json({ error: "only providers can delete a pack" });
    }
    const pack = await Package.findByPk(require.query.id);
    if (!pack) {
      return response
        .status(401)
        .json({ error: "The package does not exist." });
    }

    await pack.destroy();

    return response.json(pack);
  }
}
export default new PackageController();
