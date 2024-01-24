import mongoose, { Schema, Types } from "mongoose";

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
const Thread = mongoose.model("threads", threadSchema)
export default Thread
// console.log("Registrando il modello Thread");
// const Thread = mongoose.models.threads || mongoose.model<IThread>('threads', threadSchema);
// console.log("Modello Thread registrato:", !!Thread);


// export default Thread;
