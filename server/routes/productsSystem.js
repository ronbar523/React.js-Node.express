const express = require("express");
const router = express.Router();
const CreateController = require("../controllers/products/createProduct");
const BizMiddleware = require("../middleware/bizMiddleware");
const DeleteController = require("../controllers/products/deleteProduct");
const DeleteAllController = require("../controllers/products/deleteAllMyProducts");
const FindController = require("../controllers/products/findProduct");
const UpdateController = require("../controllers/products/updateProduct");

// Create Product Only For Biz User Or Admin
router.post(
  "/create", BizMiddleware,
  CreateController.createProductController
);

// Delete Product Only For Biz User Or Admin By ID
router.delete(
  "/delete/:id",
  BizMiddleware,
  DeleteController.deleteProductController
);

// Find All Products
router.get("/find", FindController.findAllProductsController);

// Find Only 3 Products
router.get("/find_three", FindController.FindOnlyThreeProducts);

// Find All My Products Only For Biz Or Admin
router.get(
  "/find/my_products",
  BizMiddleware, FindController.findMyProductsController
);

// Find Product By ID
router.get("/find/:id", FindController.FindProductByIdController)

// Update Product Only For Biz User Or Admin By ID
router.put("/update/:id", BizMiddleware, UpdateController.updateProductController);

// Find Products By Category Name
router.get(
  "/find_by_category/:category",
  FindController.FindProductsByCategoryController
);

// Delete My User Only For Biz User Or Admin
router.delete(
  "/delete_my_products",
  BizMiddleware,
  DeleteAllController.deleteAllMyProductsController
);

module.exports = router;
