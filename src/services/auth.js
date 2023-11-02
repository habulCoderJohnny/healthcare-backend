import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { ENUM_USER_ROLE } from "../enums/userRole.js";
import DoctorSchema from "../models/DoctorSchema.js";
import UserSchema from "../models/UserSchema.js";
import { jwtHelper } from "../helper/jwtHelper.js";
import config from "../config/index.js";
import APIError from "../errors/APIErrors.js";

const register = async (userData) => {
  const { email, role } = userData;

  let user = null;

  if (role === ENUM_USER_ROLE.DOCTOR) {
    user = await DoctorSchema.findOne({ email });
  } else {
    user = await UserSchema.findOne({ email });
  }

  // Check if User Exist
  if (user)
    throw new APIError(httpStatus.BAD_REQUEST, "User account already exist");

  if (role === ENUM_USER_ROLE.DOCTOR)
    user = await DoctorSchema.create(userData);
  else user = await UserSchema.create(userData);

  return user;
};

const login = async (userData) => {
  const { email, password } = userData;

  const user = await UserSchema.findOne({ email }).lean();

  if (!user) await DoctorSchema.findOne({ email }).lean();

  if (!user)
    throw new APIError(httpStatus.NOT_FOUND, "User account doesn't exist!");

  // Check Password
  const isPassMatched = await bcrypt.compare(password, user.password);
  if (!isPassMatched)
    throw new APIError(httpStatus.BAD_REQUEST, "User credential is wrong!");

  // Generate Token
  const payload = { _id: user._id, role: user.role };
  const token = jwtHelper.generateToken(
    payload,
    config.JWT_SECRET,
    config.JWT_SECRET_EXPIRE
  );

  return { ...user, token };
};

export const AuthService = { register, login };
