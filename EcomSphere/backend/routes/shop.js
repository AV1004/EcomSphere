const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// Delete token for Cloudinary
router.get(
  "/generate-delete-token",
  isAuth,
  shopController.generateDeleteTokenForCloudinary
);

router.get("/userProds", isAuth, shopController.getUserProducts);

router.post("/addProd", isAuth, shopController.addProduct);

router.put("/editProd", isAuth, shopController.updatedProduct);

router.delete("/deleteProd/:prodId", isAuth, shopController.deleteProduct);

module.exports = router;
