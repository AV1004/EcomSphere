const Product = require("../models/product");

exports.addProduct = (req, res, next) => {
  const { prodName, price, description, category, imageUrl } = req.body;
  console.log(prodName, price, description, category, imageUrl);
  return res.json({ success: true, message: "Product added successfully." });
};
