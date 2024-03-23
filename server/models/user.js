import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User name must be entered..."],
    unique: true,
    trim: true,
    max: 50,
  },
  password: {
    type: String,
    required: [true, "please provide a password..."],
    unique: true,
    minlength: 4,
    select: false,
  },
  email: {
    type: String,
    required: [true, "User email address must be provided..."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email..."],
    max: 50,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
