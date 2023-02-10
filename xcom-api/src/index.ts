// import mongoose from "mongoose";
// import { app } from "./app";

// // start function for connecting to db and listening
// const start = async () => {
//   // check JWT Key
//   if (!process.env.JWT_KEY) {
//     throw new Error("JWT_KEY must be defined");
//   }

//   if (!process.env.MONGO_URI) {
//     throw new Error("MONGO_URI must be defined");
//   }

//   mongoose.set("strictQuery", false);

//   // To Connect to Mongodb in local kubernetes cluster
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//       // useCreateIndex: true,
//     });
//     console.log("Connected to Mongodb");
//   } catch (err) {
//     console.error(err);
//   }
//   // listen port
//   app.listen(4000, () => {
//     console.log("Listening on Port 4000!!!");
//   });
// };

// // call the function
// start();
// function cookieSession(arg0: {}): any {
//   throw new Error("Function not implemented.");
// }

import mongoose from "mongoose";
import { app } from "./app";

const port = 4000;

mongoose.set("strictQuery", true);
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (
    !process.env.SUPERADMIN_EMAIL ||
    !process.env.SUPERADMIN_PASSWORD ||
    !process.env.SUPERADMIN_ROLE
  ) {
    throw new Error("Please Define Super Admin Credentials");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to Mongodb");
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log(`Listening on Port ${port}!!!`);
  });
};

start();
function cookieSession(arg0: {}): any {
  throw new Error("Function not implemented.");
}
