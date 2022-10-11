const ProductModel = require("../../model/productModel");
const UserModel = require("../../model/userModel");

const findAllProductsController = async (req, res) => {
  try {
    const { product } = req.query;
    const productArr = await ProductModel.findAllProduct(product);
    res.json(productArr);
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

const findMyProductsController = async (req,res) => {
    try {
        const userNameFromJwt = await UserModel.findUserByUserName(
          req.jwtData.userName
        );

        const userEmailFromJwt = await UserModel.findUserByEmail(
          req.jwtData.email
        );

        if(userNameFromJwt[0] !== undefined){

            const products = await ProductModel.findMyProduct({
                createdBy: userNameFromJwt[0].id,
            });
            res.send(products);
        } else if(userEmailFromJwt[0] !== undefined){

            const products = await ProductModel.findMyProduct({
                createdBy: userEmailFromJwt[0].id,
            });
            res.send(products);
        } else {
            throw "It's Not Your Products"
        }
    } catch(err) {
        res.status(400).json({ status: 400, err: err });
    }
}

const FindProductsByCategoryController = async (req,res) => {
  try {
    const { category } = req.params;
    const productsByCategoryArr = await ProductModel.findProductsByCategory(category);

    const allProductsArr = await ProductModel.findAllProduct()

    if(productsByCategoryArr.length === 0){
      res.json(allProductsArr)
    } else {
      res.json(productsByCategoryArr);
    } 
  }  catch (err) {
    res.status(400).json({ err: err });
  }
}


const FindOnlyThreeProducts = async (req, res) => {
  try {
    const allProductsArr = await ProductModel.findAllProduct().limit(3);

    res.json(allProductsArr);
    
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

const FindProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findProductById(id);
    res.json(product);
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};


module.exports = {
  findAllProductsController,
  findMyProductsController,
  FindProductsByCategoryController,
  FindProductByIdController,
  FindOnlyThreeProducts,
};