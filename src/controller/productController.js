import Product from "../models/productModel.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const product = await Product.findOne({ name: name });
    if (product) {
      return res.status(201).json({ message: "Already exists" });
    }
    const newProduct = await Product.create(req.body); // Assuming you want to create the product here
    return res.status(200).json(newProduct);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllProduct = async (req, res, next) => {
  try {
    const { pageNo, pageSize } = req.query;
    const page = pageNo ? parseInt(pageNo, 10) : 0;
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    const validatedPage = isNaN(page) ? 0 : page;
    const validatedSize = isNaN(size) ? 10 : size;

    const products = await Product.find({})
      .skip(validatedPage * validatedSize)
      .limit(validatedSize);
    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(deletedProduct);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
