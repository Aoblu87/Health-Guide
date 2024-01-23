import mongoose from "mongoose";
import { Schema, Types } from "mongoose";
import { Inter_Tight } from "next/font/google";

interface IThread {
  title: string;
  time: Date;

  user: Types.ObjectId;
}
const threadSchema = new Schema<IThread>({
  title: {
    type: String,
    required: true,
  },

  time: { type: Date, default: Date.now },

  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Thread =
  mongoose.models.threads<IThread> || mongoose.model("threads", threadSchema)<IThread>;

export default Thread;
