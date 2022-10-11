
import React, { useState, useEffect } from "react";

import ProductCard from "../components/main/products/productCard";

import { motion } from "framer-motion";

import {
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { getThreeProducts } from "../services/productServices";


const HomePage = ({ user, theme, setTheme, addToCart, addToFavorite }) => {

  const [modelReg, setModelReg] = useState(false);
  const [modelInfoOpen, setModelInfoOpen] = useState(false);
  const [threeProducts, setThreeProducts] = useState([]);

  useEffect(() => {
    getThreeProducts().then((res) => setThreeProducts(res.data));
  }, []);

  console.log(threeProducts);

  // Side Navbar
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const [show, setShow] = useState(false);

  const [refreshCart, setRefreshCart] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRefreshCart(true);
    }, 500);
  }, []);

  return (
    <>
      <div className={theme ? "theme-dark" : ""}>
        <img
          className={
            modelInfoOpen || modelReg ? "home-img openModelPhoto" : "home-img"
          }
          src="https://wallpapercave.com/wp/wp4600178.jpg"
        />
        <div className="categories-page ">
          <br></br>
          <div className="row justify-content-center">
            {threeProducts.map((item, index) => {
              return (
                <ProductCard
                  key={index}
                  item={item}
                  addToCart={addToCart}
                  addToFavorite={addToFavorite}
                  modelReg={modelReg}
                  setModelReg={setModelReg}
                  modelInfoOpen={modelInfoOpen}
                  setModelInfoOpen={setModelInfoOpen}
                />
              );
            })}
          </div>
          <br></br>
          <div>
            <motion.nav
              animate={show ? "open" : "closed"}
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <motion.div>
                <hr className="hr-nav"></hr>
                {/* Dark */}
                {theme ? (
                  <h5 className="theme-title fs-4"> Switch Light</h5>
                ) : (
                  <h5 className="theme-title fs-4"> Switch Dark</h5>
                )}
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setTheme(!theme);
                      setShow(false);
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </motion.div>
            </motion.nav>
            <motion.button
              className={show ? "toggle x" : "toggle arrow"}
              onClick={() => setShow((show) => !show)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
            >
              {show ? (
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default HomePage;