import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    phone: String,
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },
    activationCode: String,
  },
  { timestamps: true }
);

const userModel = mongoose.models.userModel || model("User", userSchema);
export default userModel;
