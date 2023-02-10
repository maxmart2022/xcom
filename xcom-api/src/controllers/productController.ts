import mongoose from "mongoose";
import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "@mxapp/mxcommon";
import { ProductModel } from "../models/productModel";

// To Get All Products
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find({});
  if (!products) {
    throw new NotFoundError();
  }
  res.status(200).json({ data: products });
};

// To Get a Product
export const getaProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new NotFoundError();
  }
  res.status(200).json({ data: product });
};

// To Create a New Product
export const newProduct = async (req: Request, res: Response) => {
  const { name, parents } = req.body;

  const productExists = await ProductModel.findOne({ name });
  if (productExists) throw new BadRequestError("Product exists !!!");

  const product = ProductModel.build({ name, parents });
  await product.save();

  // Creating sub-category
  if (category.parents !== null) {
    updateChildren(category);
  }

  res.status(201).send(category);
};
