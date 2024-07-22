const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/fetchUserDetails", isAuth, shopController.giveUserDataToFrontend);

// Delete token for Cloudinary
router.get(
  "/generate-delete-token",
  isAuth,
  shopController.generateDeleteTokenForCloudinary
);

router.get("/getProds", isAuth, shopController.getAllProducts);

router.get("/userProds", isAuth, shopController.getUserProducts);

router.post("/addProd", isAuth, shopController.addProduct);

router.put("/editProd", isAuth, shopController.updatedProduct);

router.delete("/deleteProd/:prodId", isAuth, shopController.deleteProduct);

router.get("/getCartItems", isAuth, shopController.getCartItems);

router.post("/addToCart", isAuth, shopController.addProductToCart);

router.post("/decreaseQtyOfProd", isAuth, shopController.decreaseQtyOfProd);

router.post(
  "/removeProdFromTheCart",
  isAuth,
  shopController.removeProductFromCart
);

router.post(
  "/create-checkout-session",
  isAuth,
  shopController.goTOCheckoutStripe
);

router.post(
  "/updateUserMobileAndName",
  isAuth,
  shopController.completeProfileMobile
);

router.post("/updateAddress", isAuth, shopController.changeAddress);

router.get(
  "/clearCartAndMadeOrder",
  isAuth,
  shopController.clearCartAndCreateOrder
);

router.get("/getOrders", isAuth, shopController.getOrdersOfUser);

module.exports = router;
