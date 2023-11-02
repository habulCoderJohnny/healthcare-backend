import httpStatus from "http-status";
import { AuthService } from "../services/auth.js";
import { catchAsync } from "../shared/catchAsync.js";

const register = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthService.register(userData);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User Registered Successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthService.login(userData);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User Loggined Successfully",
    data: result,
  });
});

export const AuthControllers = { register, login };
