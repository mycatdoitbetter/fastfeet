import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    complement: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    cep: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Notification", NotificationSchema);
