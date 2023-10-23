import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exist!"],
    required: [true, "Username is required!"],
    // match: [
    //   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //   "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    // ],
  },
  f_name: {
    type: String,
    required: [true, "Full name is required!"],
  },
  email: {
    type: String,
    unique: [true, "Username already exist!"],
    required: [true, "Username is required!"],
  },
  password: String,
  image: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  premiumAccount: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiration: Date,
  verifyToken: String,
  verifyTokenExpiration: Date,
});

const User = models.User || model("User", UserSchema);

export default User;
