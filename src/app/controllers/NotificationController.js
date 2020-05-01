import User from "../models/User";
import Notification from "../schemas/Notification";

class NotificationController {
  async list(require, response) {
    const notifications = await Notification.find({
      user: require.userId,
    }).sort("createdAt");
    return response.json(notifications);
  }
  async listAll(require, response) {
    const provider = User.findOne({
      where: { id: require.userId, provider: true },
    });
    if (!provider) {
      return response
        .status(401)
        .json({ error: "Only providers can list all the notifications" });
    }
    const notifications = await Notification.find().sort("createdAt");
    return response.json(notifications);
  }
  async read(require, response) {
    const notifications = await Notification.findByIdAndUpdate(
      require.params.id,
      { read: true },
      { new: true }
    );
    return response.json(notifications);
  }
}

export default new NotificationController();
