const Product = require("../models/product");
const User = require("../models/user");

exports.getUserProducts = (req, res, next) => {
  User.findById(req.userId)
    .populate("products")
    .then((user) => {
      return res.status(200).json({
        message: "User products fetched successfully!",
        products: user.products,
        success: true,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addProduct = (req, res, next) => {
  const { prodName, price, description, category, imageUrl } = req.body;

  let loadedUser;
  const product = new Product({
    name: prodName,
    price: price,
    description: description,
    category: category,
    imageUrl: imageUrl,
    user: req.userId,
  });

  product
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      loadedUser = user;
      user.products.push(product);
      return user.save();
    })
    .then((result) => {
      return res.status(201).json({
        message: "Product created successfully!",
        product: product,
        creator: { id: loadedUser.id, name: loadedUser.name },
        success: true,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  //   return res.json({ success: true, message: "Product added successfully." });
};
