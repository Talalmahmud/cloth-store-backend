import { NextFunction, Request, Response } from "express";
import Order from "../models/orderModel";

export const createOrder: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    let order = await Order.findOne({ name: name });
    if (order) {
      return res.status(201).json({ message: "Already exist" });
    }
    order = await Order.create(req.body);
    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const getAllOrder: any = async (
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

    const order = await Order.find({})
      .skip(validatedPage * validatedSize)
      .limit(validatedSize);
    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const getOrderById: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const updateOrder: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate({ _id: id }, req.body);

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const deleteOrder: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete({ _id: id });

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
