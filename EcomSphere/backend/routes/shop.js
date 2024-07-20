const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/addProd", isAuth, shopController.addProduct);

module.exports = router;
