const CategoryModel = require("../../model/categoryModel");

const findAllCategoriesController = async (req,res) => {
    try {
        const { category } = req.query;
        const categoriesArr = await CategoryModel.findAllCategories(category);     
        res.json(categoriesArr)
    } catch (err) {
        res.status(400).json({ status: 400, err: err });
    }
}

const FindCategoryByIdController = async (req,res) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findCategoryById(id);
        res.json(category);
    } catch (err) {
        res.status(400).json({ status: 400, err: err})
    }
}

module.exports = {
  findAllCategoriesController,
  FindCategoryByIdController,
};