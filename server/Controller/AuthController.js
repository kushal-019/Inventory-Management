import userSchema from "../Models/User.js";

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error("Please provide all fields"));
  }

  const user = await userSchema.findOne({ email }).select("+password");
  if (!user) {
    return next(new Error("Invalid username or password"));
  }

  const matched = await user.comparePassword(password);
  if (!matched) {
    return next(new Error("Invalid username or password"));
  }

  user.password = undefined;
  const token = user.createJWT();

  res.status(200).json({
    success: true,
    message: "Login successful",
    user,
    token,
  });
};

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name) return next(new Error("Please provide name"));
    if (!email) return next(new Error("Please provide email"));
    if (!password) return next(new Error("Please provide password"));
    if (!role) return next(new Error("Please define your role"));

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) return next(new Error("User already exists"));

    const user = await userSchema.create({ name, email, password, role });

    const token = user.createJWT();

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user: {
        name: user.name,
        lastName: user.lastname, 
        email: user.email,
        location: user.location,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
