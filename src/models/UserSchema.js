import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { bloodType, gender } from "../enums/common.js";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: { type: String, enum: gender },
  bloodType: { type: String, enum: bloodType },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

// Hash Password
UserSchema.pre("save", async function () {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );
});

// Check Password
UserSchema.statics.isPassMatched = async function (givenPass, savedPass) {
  const isPassMatched = await bcrypt.compare(givenPass, savedPass);

  return isPassMatched;
};

export default mongoose.model("User", UserSchema);
