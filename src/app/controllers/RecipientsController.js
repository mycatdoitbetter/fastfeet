import Recipients from "../models/Recipients";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  cpf: Yup.string().required().length(11),
  street: Yup.string().required(),
  number: Yup.string().required(),
  complement: Yup.string().required(),
  state: Yup.string().required().length(2),
  city: Yup.string().required(),
  cep: Yup.string().required().min(8).max(9),
});

class RecipientsController {
  async store(require, response) {
    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }

    const recipients = await Recipients.findOne({
      where: {
        cpf: require.body.cpf,
      },
    });

    if (recipients) {
      return response.status(400).json({ error: "Recipient already exists" });
    }

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await Recipients.create(require.body);

    return response.json({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
  }
  async update(require, response) {
    if (!(await schema.isValid(require.body))) {
      return response.status(400).json({ error: "Validation error" });
    }

    const recipient = await Recipients.findOne({
      where: {
        cpf: require.body.cpf,
      },
    });

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await recipient.update(require.body);

    return response.json({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
  }
  async list(require, response) {
    const recipients = await Recipients.findAll();

    return response.json(recipients);
  }
}
export default new RecipientsController();