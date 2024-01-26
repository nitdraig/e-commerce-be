const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const { verifyToken } = require("../utils/jwtUtils");

router.use(verifyToken);
router.post("/createProduct", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);

module.exports = router;
