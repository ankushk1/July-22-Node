const Category = require("../model/Category");

exports.createCategory = async (req, res) => {
  try {
    // First check for the category is already there
    const category = await Category.findOne({ name: req.body.name });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Then we create the category
    const categoryCreated = await Category.create(req.body);

    //If some error
    if (!categoryCreated) {
      return res.status(400).json({ message: "Category creation failed" });
    }

    // Return success response
    return res.status(200).json({ message: "Category created successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    // We want to find all the categories added
    const categories = await Category.find({ isActive: true });

    //If category array length is 0;
    if (!categories.length) {
      return res.status(400).json({ message: "No categories Found" });
    }
    return res.status(200).json({ categories });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryDeleted = await Category.findByIdAndDelete(id);

    //Check if category deleted
    if (!categoryDeleted) {
      return res.status(400).json({ message: "No category found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    //Check if category exists
    if (!category) {
      return res.status(400).json({ message: "Category not found to update" });
    }

    // Update Category
    const categoryUpdated = await Category.findByIdAndUpdate(id, {
      $set: { ...req.body }
    });

    if (!categoryUpdated) {
      return res.status(400).json({ message: "Category updation Failed" });
    }

    return res.status(200).json({ message: "Category updated Successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    //Check if category exists
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({ category, message: "Category found successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};
