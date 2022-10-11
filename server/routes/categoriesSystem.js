const express = require("express");
const router = express.Router();
const FindController = require('../controllers/categories/findCategory');
const CreateController = require('../controllers/categories/createCategory');
const DeleteController = require("../controllers/categories/deleteCategory");
const UpdateController = require("../controllers/categories/updateCategory");


const AdminMiddleware = require("../middleware/adminMiddleware");

// Find All Categories 
router.get("/find_all_categories", FindController.findAllCategoriesController);

// Find Category By Id 
router.get("/find/:id", FindController.FindCategoryByIdController);

// Create Category For Admin 
router.post("/create_category", AdminMiddleware, CreateController.createCategoryController);

// Delete Category For Admin 
router.delete("/delete/:id", AdminMiddleware, DeleteController.deleteCategoryController);

// Update Category For Admin 
router.put("/update/:id", AdminMiddleware, UpdateController.updateCategoryController);


module.exports = router;
