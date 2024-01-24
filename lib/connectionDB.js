

// import mongoose from "mongoose";

// // track the connection
// let isConnected = false;
// const connectionDB = async () => {
//   mongoose.set("strictQuery", true);
//   if (isConnected) {
//     console.log("DB connected already");
//     return;
//   }
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "MY_DB",
//     });
//     isConnected = true;
//     console.log("Server connected");
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default connectionDB;

import mongoose from "mongoose";

let isConnected = false;

const connectionDB = async () => {
  if (isConnected) {
    console.log("DB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "MY_DB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("DB connection successful");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

export default connectionDB;
