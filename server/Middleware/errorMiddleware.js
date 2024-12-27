const errorMiddleware = (err, req, res, next) => {
  // Log the error for debugging (only in development mode)
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  // Default error response
  const defaultError = {
    success: false,
    message: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
  };

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // Handle MongoDB duplicate key errors (code 11000)
  if (err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = `${Object.keys(err.keyValue).join(", ")} field must be unique`;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    defaultError.statusCode = 401;
    defaultError.message = "Invalid or expired token";
  }

  // Send the error response as JSON
  res.status(defaultError.statusCode).json({
    success: false,
    message: defaultError.message,
  });
};

export default errorMiddleware;
