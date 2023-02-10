import { Request, Response } from "express";
import { NotFoundError, BadRequestError } from "@mxapp/mxcommon";
import mongoose from "mongoose";
import { Employee } from "../models/employeeModel";

export const getAllEmployees = async (req: Request, res: Response) => {
  const employees = await Employee.find({});
  if (!employees) {
    throw new NotFoundError();
  }
  res.status(200).json({ data: employees });
};

export const newEmployee = async (req: Request, res: Response) => {
  const { name, parents } = req.body;

  const employeeExists = await Employee.findOne({ name });
  if (employeeExists) throw new BadRequestError("Employee exists !!!");

  const employee = Employee.build({ name });
  await employee.save();

  res.status(201).send(employee);
};
