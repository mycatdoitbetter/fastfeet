import User from "../models/User";
import File from "../models/File";
import Notification from "../schemas/Notification";

class NotificationController {
  async list(require, response) {
    const notifications = await Notification.find({
      user: require.userId,
    }).sort("createdAt");
    return response.json(notifications);
  }
}

export default new NotificationController();
