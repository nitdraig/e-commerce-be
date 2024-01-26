const Product = require("../models/product.model");

exports.createProduct = async (req, res, next) => {
  try {
    const { title, price, description, category } = req.body;
    const newProduct = new Product({ title, price, description, category });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Producto creado exitosamente", product: newProduct });
  } catch (error) {
    next(error);
  }
};
exports.getAllProducts = async (req, res, next) => {
  try {
    let { limit, sort } = req.query;
    limit = parseInt(limit) || 0;
    sort = sort || "asc";

    const query = Product.find().limit(limit);

    if (sort === "desc") {
      query.sort({ _id: -1 });
    } else {
      query.sort({ _id: 1 });
    }

    const products = await query.exec();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
