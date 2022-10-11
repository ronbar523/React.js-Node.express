const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pieces: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  cart: {
    type: Boolean,
    required: true,
    default: false,
  },
  like: {
    type: Boolean,
    required: true,
    default: false,
  },
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

const Product = mongoose.model("products", productSchema);


const createProduct = (
  name,
  description,
  pieces,
  price,
  category,
  url,
  alt,
  quantity,
  createdBy,
  cart,
  like,
  createdAt,
) => {
  const newProduct = new Product({
    name,
    description,
    pieces,
    price,
    category,
    url,
    alt,
    quantity,
    createdBy,
    cart,
    like,
    createdAt,
  });
  return newProduct.save();
};


const deleteProductById = (id) => {
  return Product.findByIdAndDelete(id);
};

const deleteAllMyProducts = (createdBy) => {
  return Product.remove({createdBy});
}

const findProductById = (id) => {
  return Product.findById(id)
}

const findAllProduct = () => {
  return Product.find()
}

const findAllProductByCreatedBy = (createdBy) => {
  return Product.find({ createdBy: createdBy });
};

const findProductsByCategory = (category) => {
  const filter = category ? { category } : {};
  return Product.find(filter);
};

const findMyProduct = (createdBy) => {
  return Product.find(createdBy);
};


const updateProduct = (
  id,
  { name, description, pieces, price, category, url, alt }
) => {
  return Product.findByIdAndUpdate(
    id,
    {
      $set: {
        name: name,
        description: description,
        pieces: pieces,
        price: price,
        category: category,
        url: url,
        alt: alt
      },
    },
    { new: true }
  );
};



module.exports = {
  createProduct,
  deleteProductById,
  findProductById,
  findAllProduct,
  findMyProduct,
  updateProduct,
  findProductsByCategory,
  deleteAllMyProducts,
  findAllProductByCreatedBy,
};