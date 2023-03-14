const Product = require("../model/Products");

exports.createProduct = async (req, res) => {
  try {
    // First check for the product is already there
    const product = await Product.findOne({ name: req.body.name });
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Then we create the product
    const productCreated = await Product.create({
      ...req.body,
      createdBy: req.body.userId,
      updatedBy: req.body.userId
    });

    //If some error
    if (!productCreated) {
      return res.status(400).json({ message: "Product creation failed" });
    }

    // Return success response
    return res.status(200).json({ message: "Product created successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    // We want to find all the categories added
    const products = await Product.find({
      $and: [{ isActive: true }, { quantity: { $gt: 0 } }]
    })
      .populate("category", "name description")
      .populate("createdBy", "firstname email");

    //If category array length is 0;
    if (!products.length) {
      return res.status(400).json({ message: "No products Found" });
    }
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted = await Product.findByIdAndDelete(id);

    //Check if product deleted
    if (!productDeleted) {
      return res.status(400).json({ message: "No Product found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

// Create an api getById product and also poulate the data of category and user

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    //Check if product exists
    if (!product) {
      return res.status(400).json({ message: "Product not found to update" });
    }

    // Update product
    const productUpdated = await Product.findByIdAndUpdate(id, {
      $set: { ...req.body, updatedBy: req.body.userId }
    });

    if (!productUpdated) {
      return res.status(400).json({ message: "Product updation Failed" });
    }

    return res.status(200).json({ message: "Product updated Successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.changeQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    //Check if product exists
    if (!product) {
      return res.status(400).json({ message: "Product not found to update" });
    }

    // Update product
    const productUpdated = await Product.findByIdAndUpdate(id, {
      $inc: {
        quantity: -req.body.quantity
      }
    });

    if (!productUpdated) {
      return res.status(400).json({ message: "Product updation Failed" });
    }

    return res.status(200).json({ message: "Product updated Successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};
