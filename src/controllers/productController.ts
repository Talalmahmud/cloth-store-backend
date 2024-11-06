import { NextFunction, Request, Response } from "express";
import Product from "../models/productModel";

export const createProducty: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const product = await Product.findOne({ name: name });
    if (product) {
      return res.status(201).json({ message: "Already exist" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const getAllProduct: any = async (
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

    const product = await Product.find({})
      .skip(validatedPage * validatedSize)
      .limit(validatedSize);
    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const getProductById: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const updateProduct: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate({ _id: id }, req.body);

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const deleteProduct: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete({ _id: id });

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
