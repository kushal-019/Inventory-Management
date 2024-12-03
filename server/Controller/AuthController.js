import userSchema from "../Models/User.js";

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) next("please provide all fields");

  const user = await userSchema.findOne({ email }).select("+password");
  if (!user) next("Invalid username or password");
  
  const matched = await user.comparePassword(password);
  
  if (!matched) next("Invalid username or password");
  console.log(matched)
  user.password = undefined;
  const token = user.createJWT();

  res.status(200).json({
    success: true,
    message: "Login SuccessFull",
    user,
    token,
  });
};

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name) next("please provide name");

    if (!email) next("please provide email");

    if (!password) next("please provide password");

    if (!role) next("please define your role");

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) next("User already exists");
    const user = await userSchema.create({ name, email, password, role });

    const token = user.createJWT();

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user: {
        name: user.name,
        lastname: user.lastname,
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

