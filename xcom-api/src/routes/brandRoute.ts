import { currentUser, requireAuth, validateRequest } from "@shabeebm369/common";
import { Router } from "express";
import {
  deleteBrand,
  listBrand,
  listBrandById,
  newBrand,
  updateBrand,
} from "../controllers/brandController";
import { brandsValidator } from "../validators/brandValidator";

const router = Router();

router.get("/api/brands", currentUser, requireAuth, listBrand);
router.get("/api/brands/:id", currentUser, requireAuth, listBrandById);

router.post(
  "/api/brands/new",
  //   currentUser,
  //   requireAuth,
  brandsValidator,
  validateRequest,
  newBrand
);
router.post(
  "/api/brands/update/:id",
  currentUser,
  requireAuth,
  brandsValidator,
  validateRequest,
  updateBrand
);

router.delete("/api/brands/:id", currentUser, requireAuth, deleteBrand);

export { router as brandRouter };
