const crypto = require("crypto");

const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Fetch User Data
exports.giveUserDataToFrontend = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find user!");
        error.statusCode = 404;
        throw error;
      }

      return res.status(200).json({
        user: user,
        message: "User fetched successfully!",
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

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .populate("user")
    .then((prods) => {
      return res.status(200).json({
        message: "Products fetched successfully!",
        products: prods,
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

exports.getCartItems = (req, res, next) => {
  User.findById(req.userId)
    .populate("cart.items.productId")
    .then((user) => {
      return res.status(200).json({
        cart: user.cart,
        message: "Cart items fetched successfully!",
        success: true,
      });
    });
};

exports.addProductToCart = (req, res, next) => {
  const { prodId } = req.body;

  let loadedUser;
  User.findById(req.userId)
    .then((user) => {
      loadedUser = user;
      return Product.findById(prodId);
    })
    .then((product) => {
      return loadedUser.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        message: "Product add to cart successfully!",
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

exports.decreaseQtyOfProd = (req, res, next) => {
  const { prodId } = req.body;

  User.findById(req.userId)
    .then((user) => {
      return user.decreaseFromCart(prodId);
    })
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        message: "Product remove by one from cart successfully!",
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

exports.removeProductFromCart = (req, res, next) => {
  const { prodId } = req.body;

  User.findById(req.userId)
    .then((user) => {
      return user.removeFromCart(prodId);
    })
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        message: "Product remove from cart successfully!",
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

exports.goTOCheckoutStripe = async (req, res, next) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "INR",
      unit_amount: product.productId.price * 100,
      product_data: {
        name: product.productId.name,
        description: product.productId.description,
        images: [product.productId.imageUrl.url],
      },
    },
    quantity: product.quantity,
  }));

  try {
    const loadedUser = await User.findById(req.userId);
    // Create a customer
    const customer = await stripe.customers.create({
      name: loadedUser.name,
      address: {
        line1: loadedUser.address.line1,
        line2: loadedUser.address.line2,
        city: loadedUser.address.city,
        state: loadedUser.address.state,
        postal_code: loadedUser.address.postalCode,
        country: loadedUser.address.country,
      },
      email: loadedUser.email, // Replace with a real email
    });

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:5173/checkout/success",
      cancel_url: "http://localhost:5173/checkout/fail",
      customer: customer.id, // Use the created customer's ID
    });

    res.status(200).json({
      id: session.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.completeProfileMobile = (req, res, next) => {
  const { mobile, name } = req.body;

  User.findById(req.userId)
    .then((user) => {
      user.name = name;
      user.mobile = mobile;
      return user.save();
    })
    .then((result) => {
      return res.status(200).json({
        message: "User updated successfully!",
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

exports.changeAddress = (req, res, next) => {
  const { address } = req.body;

  User.findById(req.userId)
    .then((user) => {
      user.address = address;
      return user.save();
    })
    .then((result) => {
      return res.status(200).json({
        message: "Address updated successfully!",
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

exports.clearCartAndCreateOrder = (req, res, next) => {
  User.findById(req.userId)
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((item) => {
        return {
          product: item.productId,
          quantity: item.quantity,
          subtotal: item.productId.price * item.quantity,
        };
      });
      let total = 0;
      for (let i = 0; i < products.length; i++) {
        total = total + products[i].subtotal;
      }
      const order = new Order();
      order.user = user._id;
      order.orderItems = products;
      order.total = total;
      return order.save().then((result) => {
        user.orders.push(order);
        return user.save().then(() => {
          return user.clearCart();
        });
      });
    })
    .then((result) => {
      return res.status(200).json({
        message: "Cart cleared and order created successfully!",
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

exports.getOrdersOfUser = (req, res, next) => {
  User.findById(req.userId)
    .populate("orders")
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find User!");
        error.statusCode = 404;
        throw error;
      }

      return res.status(200).json({
        orders: user.orders,
        message: "Orders fetched successfully!",
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
