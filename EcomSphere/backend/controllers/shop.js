const crypto = require("crypto");

const Product = require("../models/product");
const User = require("../models/user");

// Generating Delete token for cloudinary
exports.generateDeleteTokenForCloudinary = (req, res, next) => {
  const public_id = req.query.public_id;
  const timestamp = Math.floor(new Date().getTime() / 1000);

  const api_secret = process.env.CLOUD_API_SECRET; // Replace with your Cloudinary API secret
  const signature = crypto
    .createHash("sha1")
    .update(`public_id=${public_id}&timestamp=${timestamp}${api_secret}`)
    .digest("hex");

  res.json({
    timestamp,
    signature,
  });
};

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
    imageUrl: { public_id: imageUrl[1], url: imageUrl[0] },
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

exports.updatedProduct = (req, res, next) => {
  const { prodId, prodName, price, description, category, imageUrl } = req.body;

  Product.findById(prodId)
    .then((prod) => {
      // Checking if product is exists or not!
      if (!prod) {
        const error = new Error("Could not find product!");
        error.statusCode = 404;
        throw error;
      }

      //Authenticating that if user has created this product or not!
      if (prod.user.toString() !== req.userId) {
        const error = new Error("Not authorized to edit product!");
        // Not authorized!
        error.statusCode = 403;
        throw error;
      }

      prod.name = prodName;
      prod.price = price;
      prod.description = description;
      prod.category = category;
      prod.imageUrl = { public_id: imageUrl[1], url: imageUrl[0] };
      return prod.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Product edited successfully!",
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

exports.deleteProduct = (req, res, next) => {
  const { prodId } = req.params;
  Product.findById(prodId)
    .then((prod) => {
      // Checking if product is exists or not!
      if (!prod) {
        const error = new Error("Could not find product!");
        error.statusCode = 404;
        throw error;
      }

      //Authenticating that if user has created this product or not!
      if (prod.user.toString() !== req.userId) {
        const error = new Error("Not authorized to edit product!");
        // Not authorized!
        error.statusCode = 403;
        throw error;
      }

      return Product.findByIdAndDelete(prodId);
    })
    .then((result) => {
      console.log(result);
      return User.findById(req.userId);
    })
    .then((user) => {
      // to delete product from prodcuts in user in db!
      user.products.pull(prodId);
      return user.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Product deleted successfully!",
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
