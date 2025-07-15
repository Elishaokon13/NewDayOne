import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
