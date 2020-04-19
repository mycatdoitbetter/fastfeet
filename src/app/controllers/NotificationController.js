import User from "../models/User";
import File from "../models/File";
import Notification from "../schemas/Notification";

class NotificationController {
  async list(require, response) {
    const notifications = await Notification.find();
    return response.json({ ok: true });
  }
}

export default new NotificationController();
