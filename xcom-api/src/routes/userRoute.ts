import express from "express";
import { validateRequest, requireAuth, currentUser } from "@shabeebm369/common";
import {
  signUpController,
  signUpSupermanController,
  signinController,
  listUsersController,
} from "../controllers/userController";
import {
  signInValidator,
  signUpValidator,
  userUpdateValidator,
} from "../validators/userValidators";
import { requireSuperman } from "../middlewares/userMiddleware";
// import { signinController } from "../controllers/signin";
// import { listUsersController } from "../controllers/list-users";
// import { updateUserController } from "../controllers/udpate-user";

const router = express.Router();

router.post("/api/superman/new", signUpSupermanController);

router.post(
  "/api/superman/users/new",
  requireSuperman,
  currentUser,
  requireAuth,
  signUpValidator,
  validateRequest,
  signUpController
);

router.post(
  "/api/superman/users/signin",
  requireSuperman,
  signInValidator,
  validateRequest,
  signinController
);

router.get(
  "/api/superman/users",
  requireSuperman,
  // currentUser,
  // requireAuth,
  listUsersController
);

// router.put(
//   "/api/superman/users/update/:id",
//   requireSuperman,
//   currentUser,
//   requireAuth,
//   userUpdateValidator,
//   validateRequest,
//   updateUserController
// );

export { router as userRouter };
