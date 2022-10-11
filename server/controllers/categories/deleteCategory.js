const CategoryModel = require("../../model/categoryModel");

const deleteCategoryController = async (req,res) => {
    try {
        const { id } = req.params;    
        await CategoryModel.deleteCategoryById(id);
        res.json({ msg: "Category Deleted Successfully" });
    } catch (err) {
        res.status(400).json({ err: err})
    }
}

module.exports = {
    deleteCategoryController
}