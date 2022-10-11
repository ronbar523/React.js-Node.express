import React, { Suspense, } from "react";
import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./css/App.css";
import "./css/sideNav.css";
import "./css/dark.css";
import "./css/cart.css";
import "./css/form.css";
import "./css/model.css";
import "./css/navbar.css";




import { getCurrentUser } from "./services/usersServices";


import Navbar from "./components/header/navbar";
import Footer from "./components/footer/footer";


import Categories from "./pages/categories";
import Products from "./pages/products";

import HomePage from "./pages/homepage";
import Login from "./pages/LoginSystem/login"
import Logout from "./pages/LoginSystem/logout";
import MyProducts from "./pages/myProducts";
import Cart from "./pages/cart";
import MyFavorite from "./pages/myFavorite";

const Register = React.lazy(() => import('./pages/LoginSystem/register')) 
const ForgetPassword = React.lazy(() => import("./pages/LoginSystem/forgetPassword"));
const ChangePassword = React.lazy(() => import("./pages/LoginSystem/changePassword"));
const UserChangePassword = React.lazy(() =>
  import("./pages/LoginSystem/logChangePassword")
);
const DeleteMyUser = React.lazy(() =>
  import("./pages/LoginSystem/deleteMyUser")
);

const VerifyUser = React.lazy(() => import('./pages/LoginSystem/verifyUser'));
const UpdateCategory = React.lazy(() => import('./components/main/categories/updateCategory'));
const CreateCategory = React.lazy(() => import("./components/main/categories/createCategory"));


const CreateProduct = React.lazy(() =>
  import("./components/main/products/createProduct")
);
const UpdateProduct = React.lazy(() =>
  import("./components/main/products/updateProduct")
);

const BecomeBiz = React.lazy(() => import("./pages/LoginSystem/becomeBiz"));


function App() {

  // Dark / Light Mode
  const getTheme = () => {
    return JSON.parse(localStorage.getItem("theme")) || false;
  };
  const [theme, setTheme] = useState(getTheme());
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const user = getCurrentUser();

   
  const [productsArr, setProductsArr] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart" + user?._id) || "[]")
  );
  const [like, setLike] = useState(
    JSON.parse(localStorage.getItem("like" + user?._id) || "[]")
  );

  useEffect(() => {

    productsArr.forEach((item) => {
      const itemFromCart = cart.find((cartItem) => cartItem._id === item._id);
      if (itemFromCart) {
        item.cart = true;
      }
    });
  }, [productsArr, cart]);

  useEffect(() => {
    productsArr.forEach((item) => {
      const itemFromFavorite = like.find(
        (likeItem) => likeItem._id === item._id
      );

      if (itemFromFavorite) {
        item.like = true;
      }
    });
  }, [productsArr, like]);

  function addToCart(item) {
    let cart2 = [...cart];
    cart2.push({ ...item });

    productsArr.map((i) => {
      if (i._id === item._id) {
        i.cart = true;
      }
    });
    setCart(cart2);
    localStorage.setItem("cart" + user?._id, JSON.stringify(cart2));
  }

  

  function addToFavorite(item) {
    let like2 = [...like];
    like2.push({ ...item });

    productsArr.map((i) => {
      if (i._id === item._id) {
        i.like = true;
      }
    });
    setLike(like2);
    localStorage.setItem("like" + user?._id, JSON.stringify(like2));
  }



  function removeToCart(item) {
    let cart2 = cart.filter((i) => i._id !== item._id);
    productsArr.map((i) => {
      if (i._id === item.id) {
        i.cart = false;
      }
    });
    setCart(cart2);
    localStorage.setItem("cart" + user?._id, JSON.stringify(cart2));
  }

  function removeToFavorite(item) {
    let like2 = like.filter((i) => i._id !== item._id);
    productsArr.map((i) => {
      if (i._id === item.id) {
        i.like = false;
      }
    });
    setLike(like2);
    localStorage.setItem("like" + user?._id, JSON.stringify(like2));
  }



  return (
    <>
      <Navbar theme={theme} />
      <main className="">
        <Suspense fallback={<div> loading </div>}>
          <ToastContainer />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage user={user} theme={theme} setTheme={setTheme} addToCart={addToCart} addToFavorite={addToFavorite}
                />
              }
            />
            <Route
              path="categories"
              element={<Categories theme={theme} setTheme={setTheme} />}
            />
            <Route
              path="categories/update/:id"
              element={<UpdateCategory theme={theme} setTheme={setTheme} />}
            />
            <Route
              path="products/update/:id"
              element={<UpdateProduct theme={theme} setTheme={setTheme} />}
            />

            <Route
              path="categories/:category"
              element={
                <Products
                  theme={theme}
                  setTheme={setTheme}
                  productsArr={productsArr}
                  setProductsArr={setProductsArr}
                  addToCart={addToCart}
                  addToFavorite={addToFavorite}
                />
              }
            />

            <Route
              path="my_favorite"
              element={
                <MyFavorite
                  user={user}
                  theme={theme}
                  setTheme={setTheme}
                  addToCart={addToCart}
                  removeToFavorite={removeToFavorite}
                  like={like}
                />
              }
            />

            <Route
              path="my_products"
              element={<MyProducts theme={theme} setTheme={setTheme} />}
            />

            <Route
              path="/my_cart"
              element={
                <Cart
                  cart={cart}
                  setCart={setCart}
                  removeToCart={removeToCart}
                  theme={theme}
                  setTheme={setTheme}
                />
              }
            />

            <Route
              path="categories/create"
              element={<CreateCategory theme={theme} setTheme={setTheme} />}
            />
            <Route
              path="products/create"
              element={<CreateProduct theme={theme} setTheme={setTheme} />}
            />

            <Route
              path="/register"
              element={<Register theme={theme} setTheme={setTheme} />}
            />
            <Route
              path="/login"
              element={<Login theme={theme} setTheme={setTheme} />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/verify_user/:email" element={<VerifyUser />} />
            <Route
              path="/login/forget_password"
              element={<ForgetPassword theme={theme} setTheme={setTheme} />}
            />
            <Route
              path="/rest_password/:email/:num"
              element={<ChangePassword theme={theme} setTheme={setTheme} />}
            />
            <Route
              path="/change_password"
              element={<UserChangePassword theme={theme} setTheme={setTheme} />}
            />
            <Route
              path="/delete_account"
              element={
                <DeleteMyUser user={user} theme={theme} setTheme={setTheme} />
              }
            />
            <Route path="/become_biz" element={<BecomeBiz />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="footer-page">
        <Footer />
      </footer>
    </>
  );
}

export default App;
