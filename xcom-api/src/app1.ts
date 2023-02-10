import express from "express";
import "express-async-errors";
import { json } from "body-parser";
// import cors from "cors";
import cookiesSession from "cookie-session";

// import { currentUserRouter } from "./routes/currentuser";
// import { signinRouter } from "./routes/signin";
// import { signupRouter } from "./routes/signup";
// import { signoutRouter } from "./routes/signout";
import { errorHandler, NotFoundError } from "@mxapp/mxcommon";
// import { corsOptions } from "../src/config/corsOptions";
import { helloRouter } from "./routes/hello";
// import { EmployeeRouter } from "./routes/employeeRoute";
// import { CategoriesRouter } from "./routes/categoryRoute";

// app.use(cors(corsOptions));

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookiesSession({
    signed: false,
    // secure: true,
    secure: process.env.NODE_ENV !== "test",
  })
);

// routes
app.use(helloRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// app.use(errorHandler);

// export { app };
