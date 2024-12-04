const errorMiddleWare = (err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  const defaultError = {
    success: false,
    message: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
  };

  // Handle ValidationError from Mongoose
  if (err.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // Handle MongoDB duplicate key errors (11000 code)
  if (err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = `${Object.keys(err.keyValue)} field must be unique`;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    defaultError.statusCode = 401;
    defaultError.message = "Invalid or expired token";
  }

  // Handle any other specific error types you want
  if (err.statusCode === 404) {
    defaultError.message = "Resource not found";
  }

  res.status(defaultError.statusCode).json({
    success: false,
    message: defaultError.message,
  });
};

export default errorMiddleWare;
