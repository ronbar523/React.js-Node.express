const CategoryModel = require("../../model/categoryModel");
const CategoryValidation = require("../../validation/categoriesValidation");

const createCategoryController = async (req,res) => {
    try {
        const requestCategory = await CategoryValidation.categorySchema.validateAsync(req.body, {abortEarly: false})

        await CategoryModel.createCategory(requestCategory.name, requestCategory.url, requestCategory.alt );

        res.json({ status: 200, msg: "work", response: requestCategory });
    } catch (err) {
        res.status(400).json({ status: 400, err: err });
    }
}

 module.exports = {
   createCategoryController,
 };
