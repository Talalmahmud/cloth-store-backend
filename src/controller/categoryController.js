import Category from "../models/categoryModel.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    let category = await Category.findOne({ name: name });
    if (category) {
      return res.status(201).json({ message: "Already exists" });
    }
    category = await Category.create(req.body);
    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const { pageNo, pageSize } = req.query;
    const page = pageNo ? parseInt(pageNo, 10) : 0;
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    const validatedPage = isNaN(page) ? 0 : page;
    const validatedSize = isNaN(size) ? 10 : size;

    const categories = await Category.find({})
      .skip(validatedPage * validatedSize)
      .limit(validatedSize);
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(deletedCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
