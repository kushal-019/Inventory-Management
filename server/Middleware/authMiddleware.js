import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new Error("Authentication failed. No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token and extract userId
    const payload = JWT.verify(token, process.env.JWTTOKEN);
    req.user = { userId: payload.userId }; // Attach userId to request object
    next();
  } catch (error) {
    return next(new Error("Authentication failed. Invalid token"));
  }
};

export default userAuth;
