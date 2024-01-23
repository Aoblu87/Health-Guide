import mongoose from "mongoose";
import { Schema} from 'mongoose';

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const Thread = mongoose.models.threads || mongoose.model("threads", threadSchema);

export default Thread;
