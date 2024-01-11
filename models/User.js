import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return this.googleId ? false : true;
    },
  },
  googleId: {
    type: String,
    required: function () {
      return this.password ? false : true;
    },
  },
  dayOfBirth: {
    type: String,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
