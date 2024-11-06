import { NextFunction, Request, Response } from "express";
import Category from "../models/categoryModel";

export const createCategory: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({ name: name });
    if (category) {
      return res.status(201).json({ message: "Already exist" });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const getAllCategory: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageNo, pageSize } = req.query as {
      pageNo?: string;
      pageSize?: string;
    };
    const page = pageNo ? parseInt(pageNo, 10) : 0;
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    const validatedPage = isNaN(page) ? 0 : page;
    const validatedSize = isNaN(size) ? 10 : size;

    const category = await Category.find({})
      .skip(validatedPage * validatedSize)
      .limit(validatedSize);
    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const getCategoryById: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const updateCategory: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate({ _id: id }, req.body);

    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const deleteCategory: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete({ _id: id });

    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
