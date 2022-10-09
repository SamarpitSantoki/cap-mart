import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    cartItems: {
      type: [
        {
          _id: String,
          name: String,
          count: Number,
          price: Number,
          total: Number,
        },
      ],
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Cash On Delivery",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);