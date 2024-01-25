import mongoose, { Schema, Types } from "mongoose";

interface IThread {
  threadId: string
  title: string;
  time: Date;

  user: Types.ObjectId;
}
const threadSchema = new mongoose.Schema<IThread>({
  threadId: {
    type: String,
    required: true,
  },
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
const Thread = mongoose.models.threads|| mongoose.model("threads", threadSchema)
export default Thread


// const ThreadModel = mongoose.model('Customer', threadSchema)
// // type `mongoose.models.Customer` same as `CustomerModel`
// export const Customer = (mongoose.models.threads as typeof ThreadModel) || ThreadModel; 
