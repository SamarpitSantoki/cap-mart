import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
