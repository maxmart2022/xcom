import {
  currentUser,
  requireAuth,
  validateRequest,
} from "../helpers/errorHander";
import express from "express";
import {
  deleteCategory,
  listCategory,
  newCategory,
  updateCategory,
  userList,
  viewCategory,
} from "../controllers/category";
import { categoryValidator } from "../validators/category";

const router = express.Router();

router.get("/api/category/list", currentUser, requireAuth, listCategory);

router.get("/api/category/view/:id", currentUser, requireAuth, viewCategory);

router.post(
  "/api/category/new",
  currentUser,
  requireAuth,
  categoryValidator,
  validateRequest,
  newCategory
);

router.put(
  "/api/category/update/:id",
  currentUser,
  requireAuth,
  categoryValidator,
  validateRequest,
  updateCategory
);

router.delete(
  "/api/category/delete/:id",
  currentUser,
  requireAuth,
  deleteCategory
);

router.get("/api/category/users", currentUser, requireAuth, userList);

export { router as categoryRouter };
