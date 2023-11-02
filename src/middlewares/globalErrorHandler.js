import config from "../config/index.js";
import APIError from "../errors/APIErrors.js";

const globalErrorHandler = (error, req, res, next) => {

  let statusCode = 500;
  let message = "Internal Server Error";
  let errorMessages = [];

  if (error instanceof APIError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [{ path: "", message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error?.message
      ? [{ path: "", message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
