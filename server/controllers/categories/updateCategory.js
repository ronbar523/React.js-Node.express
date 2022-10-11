const CategoryModel = require("../../model/categoryModel");
const CategoryValidation = require("../../validation/categoriesValidation");


const updateCategoryController = async (req,res) => {
    try {
        const { id } = req.params;
        const requestCategory =
          await CategoryValidation.categorySchema.validateAsync(req.body, {
            abortEarly: false,
          });

        await CategoryModel.updateCategory(id, requestCategory);
        res.json({ msg: "Category updated successfully" });

    } catch (err) {
        res.status(400).json({err: err})
    }
}

module.exports = { 
    updateCategoryController 
};