import User from "../models/User";
import Recipients from "../models/Recipients";
import Problems from "../models/Problems";
import Package from "../models/Package";
import File from "../models/File";

class ProblemController {
  async store(require, response) {
    const { title, description } = require.body;
    const package_id = require.query.id;

    const pack = await Package.findByPk(package_id);

    if (!pack) {
      return response.status(404).json({ error: "Package not found" });
    }

    const problem = await Problems.findOne({ where: { package_id } });
    if (problem) {
      console.log(problem);
      return response
        .status(401)
        .json({ error: "The package have already a problem recorded" });
    }
    const newProblem = await Problems.create({
      title,
      description,
      package_id,
    });
    await pack.update({ canceled_at: new Date() });

    return response.json({ newProblem });
  }
  async list(require, response) {
    const isProvider = await User.findOne({where : {id: require.userId, provider: true}})
    
    const problems = await Problems.findAll({
      attributes: ["id", "title", "description"],
      include: [
        {
          model: Package,
          as: "packages",
          attributes: ["id", "product", "canceled_at"],
          
          include: [
            {
              model: Recipients,
              as: "recipients",
              attributes: [
                "id",
                "name",
                "cpf",
                "street",
                "number",
                "complement",
                "state",
                "city",
                "cep",
                
              ],
            },
            isProvider
              ? {
                  model: User,
                  as: "deliveryman",
                  attributes: ["id", "name"],
                  include: [{ model: File, as: "avatar", attributes: ["id", "url"],}],
                }
              : {
                  where: { id: require.userId },
                  model: User,
                  as: "deliveryman",
                  attributes: ["id", "name"],
                  include: [{ model: File, as: "avatar", attributes: ["id", "url"] }],
                },
          ],
        },
      ],
    });
   
    console.log({problems})
    return response.json( problems );
  }
}
export default new ProblemController();
