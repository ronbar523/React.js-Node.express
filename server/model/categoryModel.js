const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // image: {
        url: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: true
        }
    // },
});

const Category = mongoose.model("categories", categorySchema);

const createCategory = (name, url, alt) => {
    const newCategory = new Category({
        name,
        url, alt
    });
    return newCategory.save()
}

const findAllCategories = () => {
    return Category.find().select(["-__v"]);;
}

const findCategoryById = (id) => {
  return Category.findById(id).select(["-__v"]);
}; 

const deleteCategoryById = (id) => {
    return Category.findByIdAndDelete(id)
}

const updateCategory = (
  id,
  {
    name,
    url,
    alt
    // image: { url, alt },
  }
) => {
  return Category.findByIdAndUpdate(
    id,
    {
      $set: {
        name: name,
        url: url,
        alt: alt
        // ["image.url"]: url,
        // ["image.alt"]: alt,
      },
    },
    { new: true }
  );
};





module.exports = {
  createCategory,
  findCategoryById,
  findAllCategories,
  deleteCategoryById,
  updateCategory,
};