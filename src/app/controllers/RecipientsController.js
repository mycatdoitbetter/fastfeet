import Recipients from "../models/Recipients";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
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

    // const {
    //   name,
    //   street,
    //   number,
    //   complement,
    //   state,
    //   city,
    //   cep,
    // } = require.body;

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await user.update(require.body);

    // const user = await Recipients.findByPk(require.userId);

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
}
export default new RecipientsController();
