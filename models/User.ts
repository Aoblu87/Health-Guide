import mongoose from "mongoose";
import { Schema, Types} from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  googleId:string
  dayOfBirth:string
  avatar:string;
  time: Date
  threads: Types.ObjectId[]
}
const userSchema = new Schema<IUser>({
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
  time : { type : Date, default: Date.now },

  threads: {
    type: [Schema.Types.ObjectId],
    ref: "threads", 
    default: []
  },
  


});

const User = mongoose.models.users<IUser> || mongoose.model("users", userSchema)<IUser>;

export default User;
