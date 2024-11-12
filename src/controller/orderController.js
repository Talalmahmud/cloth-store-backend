import Order from "../models/orderModel.js";

export const createOrder = async (req, res, next) => {
  try {
    const { name } = req.body;
    let order = await Order.findOne({ name: name });
    if (order) {
      return res.status(201).json({ message: "Already exists" });
    }
    order = await Order.create(req.body);
    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllOrder = async (req, res, next) => {
  try {
    const { pageNo, pageSize } = req.query;
    const page = pageNo ? parseInt(pageNo, 10) : 0;
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    const validatedPage = isNaN(page) ? 0 : page;
    const validatedSize = isNaN(size) ? 10 : size;

    const orders = await Order.find({})
      .skip(validatedPage * validatedSize)
      .limit(validatedSize);
    return res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(deletedOrder);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
