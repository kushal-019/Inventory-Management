import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "UserName is required"],
  },
  lastname: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Customer", "Retailer", "WholeSaler"],
    default: "Customer",
  },
  email: {
    type: String,
    required: [true, "name is required"],
    unique: true,
    validator: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "name is required"],
    minlength: [6, "Minimum 6 digit expected"],
    select: true,
  },
});

userSchema.pre("save", async function () {
  if (!this.modified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (userPassword) {
  const matched = await bcrypt.compare(userPassword, this.password);

  return matched;
};
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWTTOKEN, {
    expiresIn: "5d",
  });
};

export default mongoose.model("User", userSchema);