import {
  BadRequestError,
  DatabaseConnectionError,
  NotFoundError,
  currentUser,
} from "@shabeebm369/common";
import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
// import { Authorization } from "../models/authorizationModel";
import { buildSubCategory, Category } from "../models/categoryModel";
import { User } from "../models/userModel";

const { ObjectId } = mongoose.Types;

const listCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.find({}).populate(["parent", "child"]);
    // const category = await Category.find({})
    return res.status(200).send(category);
  } catch (err) {
    if (err instanceof mongoose.Error) {
      throw new DatabaseConnectionError(err.message);
    } else {
      throw new DatabaseConnectionError("Something went wrong");
    }
  }
};

const viewCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId).populate([
    "parent",
    "child",
  ]);
  return res.status(200).send(category);
};

const newCategory = async (req: Request, res: Response) => {
  const { name, parent } = req.body;

  const categoryExists = await Category.findOne({ name });
  if (categoryExists) throw new BadRequestError("Category exists !!!");

  if (typeof parent != "undefined") {
    for (const parentCateg of parent) {
      if (!ObjectId.isValid(parentCateg))
        throw new BadRequestError("Parent category is invalid");
      const parentCategory = await Category.findById(parentCateg);
      if (!parentCategory)
        throw new BadRequestError(
          `Parent Category, ${parentCateg} doesn't exist`
        );
    }
  }

  const createdBy = new ObjectId(req.currentUser?.id);
  const user = await User.findById(createdBy);
  if (!user) throw new BadRequestError("Such a user not found");

  const category = Category.build({ name, parent, createdBy });
  await category.save();

  if (category.parent !== null) {
    buildSubCategory(category);
  }

  res.status(201).send(category);
};

const updateCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const { name, parent } = req.body;

  // Check the id passed is valid or not
  if (!ObjectId.isValid(categoryId)) throw new NotFoundError();

  // Fetch the category with the given id
  const category = await Category.findById(categoryId);
  if (!category) throw new NotFoundError();

  // Category name unique validation, category where name=name and id!=givenId
  const categoryExists = await Category.findOne({
    name,
    _id: { $ne: categoryId },
  });
  if (categoryExists) throw new BadRequestError("Category exists !!!");

  if (typeof parent != "undefined") {
    for (const parentCateg of parent) {
      if (!ObjectId.isValid(parentCateg))
        throw new BadRequestError("Parent category is invalid");
      const parentCategory = await Category.findById(parentCateg);
      if (!parentCategory)
        throw new BadRequestError(
          `Parent Category, ${parentCateg} doesn't exist`
        );
    }
  }
  // only name changes
  if (
    category.name !== name &&
    category.parent.every((val, index) => val === parent[index])
  ) {
    category.set({ name, parent });
    await category.save();
  } else {
    if (category.parent.length > 0) {
      // Removing the child from the current parent
      for (const currentParent of category.parent) {
        const currentParentCategory = await Category.findById(currentParent);
        if (!currentParentCategory)
          throw new BadRequestError(
            `Parent Category, ${currentParent} removed but not in parent`
          );
        const filteredChild = currentParentCategory.child.filter(
          (currentChild) => {
            return !currentChild.equals(new ObjectId(categoryId));
          }
        );
        await Category.findByIdAndUpdate(currentParent, {
          $set: { child: filteredChild },
        });
      }
    }
    // Update with new inputs
    category.set({ name, parent });
    await category.save();
    // Updating child in parent category
    if (category.parent && category.parent.length > 0) {
      buildSubCategory(category);
    }
  }
  res.status(201).send(category);
};

const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  if (!ObjectId.isValid(categoryId))
    throw new BadRequestError("Invalid category");

  const category = await Category.findById(categoryId);
  if (!category)
    throw new BadRequestError("Category of this id does not exists");

  const categoryParent = category.parent;
  const categoryChild = category.child;

  const modifiedCategoryId = new ObjectId(categoryId);

  // Updating child in the parent category
  if (categoryParent.length > 0) {
    for (const parentId of categoryParent) {
      const parent = await Category.findById(parentId);
      if (!parent)
        throw new BadRequestError("Parent in this category not found");
      const filteredChild = parent.child.filter((parentChild) => {
        return !parentChild.equals(modifiedCategoryId);
      });
      await Category.findByIdAndUpdate(parentId, {
        $set: { child: filteredChild },
      });
    }
  }

  // Updating parent in child
  if (categoryChild.length > 0) {
    for (const childId of categoryChild) {
      const childCategory = await Category.findById(childId);
      if (!childCategory) throw new BadRequestError("Child not found");
      const filteredParent = childCategory.parent.filter((childParent) => {
        return !childParent.equals(modifiedCategoryId);
      });
      await Category.findByIdAndUpdate(childId, {
        $set: { parent: filteredParent },
      });
    }
  }

  await Category.deleteMany({ _id: new ObjectId(categoryId) });

  res.status(200).send(category);
};

// const userList = async (req: Request, res: Response) => {
//   const users = await Authorization.find({});
//   res.status(200).send(users);
// };

export {
  listCategory,
  viewCategory,
  newCategory,
  updateCategory,
  deleteCategory,
  // userList,
};
