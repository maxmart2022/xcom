import express, { Router } from "express";
import {
  getAllEmployees,
  newEmployee,
} from "../controllers/employeeController";

const router = express.Router();

router.route("/employee").get(getAllEmployees).post(newEmployee).put().delete();

export { router as EmployeeRouter };
