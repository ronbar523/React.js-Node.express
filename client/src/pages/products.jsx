import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getProductsByCategory,
} from "../services/productServices";
import { getCurrentUser } from "../services/usersServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faXmark,
  faArrowRight,
  faArrowRightLong,
  
} from "@fortawesome/free-solid-svg-icons";

import ProductCard from "../components/main/products/productCard"


const Products = ({
  theme,
  setTheme,
  productsArr,
  setProductsArr,
  addToCart,
  addToFavorite,
}) => {
  const user = getCurrentUser();

  // Bring All the Products By Category Or All Products And Sort

  useEffect(() => {
    const getCurrentCategory = () => {
      const url = window.location.href;
      const urlWordsArr = url.split("/");
      return urlWordsArr[urlWordsArr.length - 1];
    };

    getProductsByCategory(getCurrentCategory()).then((res) =>
      setProductsArr(res.data)
    );
  }, []);

  productsArr.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  // Sort By...
  const [littleNameArr, setLittleNameArr] = useState(true);
  const [bigNameArr, setBigNameArr] = useState(false);
  const [highPriceArr, setHighPriceArr] = useState(false);
  const [lowPriceArr, setLowPriceArr] = useState(false);

  // Search Category
  const [filter, setFilter] = useState("");

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  const dataSearch = productsArr.filter((item) => {
    return item.name
      .toLowerCase()
      .includes(filter.toLowerCase() || Number(filter));
  });

  // Slider
  const [noOfElement, setNoOfElement] = useState(4);

  const loadMore = () => {
    if (productsArr.length > noOfElement) {
      setNoOfElement(noOfElement + 4);
    }
  };

  const loadLess = () => {
    if (noOfElement > 5) {
      setNoOfElement(noOfElement - 4);
    }
  };

  // Side Navbar
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const [show, setShow] = useState(false);

  // Page Title
  const urlSite = window.location.href;
  const urlWordsArr = urlSite.split("/");
  const categoryName = urlWordsArr[4];

  const [refreshCart, setRefreshCart] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRefreshCart(true);
    }, 1000);
  }, []);

  const [modelReg, setModelReg] = useState(false);
  const [modelInfoOpen, setModelInfoOpen] = useState(false);
  const [modelDelete, setModelDelete] = useState(false);


  return (
    <div className={theme ? "theme-dark" : ""}>
      <div className="categories-page">
        <h1
          className={
            modelReg || modelInfoOpen || modelDelete
              ? "text-center title-shop openModel"
              : "text-center title-shop"
          }
        >
          {categoryName}
        </h1>
        {user?.isAdmin || user?.biz ? (
          <div
            className={
              modelReg || modelInfoOpen || modelDelete
                ? "col-12 mb-2 openModel"
                : "col-12 mb-2"
            }
          >
            <Link to={`/products/create`}>
              <button className="btn btn-primary fs-5 btn-create ">
                Create Product
              </button>
            </Link>
          </div>
        ) : null}

        <h3
          className={
            modelReg || modelInfoOpen || modelDelete
              ? "from-label h4 search-location mt-4 ms-1 openModel"
              : "from-label h4 search-location mt-4 ms-1"
          }
        >
          {" "}
          Search: &nbsp;
        </h3>
        <input
          type="text"
          className={
            modelReg || modelInfoOpen || modelDelete
              ? "from-control search-location ms-1 mb-2 openModel"
              : "from-control search-location ms-1 mb-2"
          }
          value={filter}
          onChange={(e) => {
            searchText(e);
          }}
        />
        <div className="row justify-content-center mt-4">
          {/* Sort A => Z */}
          {filter.length === 0 && littleNameArr
            ? productsArr.slice(0, noOfElement).map((item, index) => {
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
                    modelDelete={modelDelete}
                    setModelDelete={setModelDelete}
                  />
                );
              })
            : null}

          {/* Sort Z => A */}
          {filter.length === 0 && bigNameArr
            ? productsArr
                .sort((a, b) => (a.name < b.name ? 1 : -1))
                .slice(0, noOfElement)
                .map((item, index) => {
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
                      modelDelete={modelDelete}
                      setModelDelete={setModelDelete}
                      />
                  );
                })
            : null}

          {/* Price High Sort */}
          {filter.length === 0 && highPriceArr
            ? productsArr
                .sort((a, b) => (a.price < b.price ? 1 : -1))
                .slice(0, noOfElement)
                .map((item, index) => {
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
                      modelDelete={modelDelete}
                      setModelDelete={setModelDelete}
                      />
                  );
                })
            : null}

          {/* Price Low Sort */}
          {filter.length === 0 && lowPriceArr
            ? productsArr
                .sort((a, b) => (a.price > b.price ? 1 : -1))
                .slice(0, noOfElement)
                .map((item, index) => {
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
                      modelDelete={modelDelete}
                      setModelDelete={setModelDelete}
                      />
                  );
                })
            : null}

          {/* Search */}
          {filter.length > 0 && dataSearch.length > 0 ? (
            dataSearch.slice(0, noOfElement).map((item, index) => {
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
                  modelDelete={modelDelete}
                  setModelDelete={setModelDelete}
                />
              );
            })
          ) : filter.length > 0 && dataSearch.length === 0 ? (
            <h1 className="text-center mb-4"> Products Doesn't Found</h1>
          ) : null}

          <button
            disabled={
              (noOfElement >= dataSearch.length && dataSearch.length > 0) ||
              (noOfElement >= productsArr.length && productsArr.length > 0) ||
              (filter.length >= 1 && dataSearch.length <= 0) ||
              modelReg ||
              modelInfoOpen ||
              modelDelete
            }
            className={
              theme
                ? "btn btn-light d-block py-2 col-12 container mb-1"
                : "btn btn-primary d-block py-2 col-12 container mb-1"
            }
            onClick={() => loadMore()}
          >
            Load More &nbsp;
            <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
          </button>
          <button
            className={
              theme
                ? "btn btn-light d-block py-2 col-12 container mb-1"
                : "btn btn-primary d-block py-2 col-12 container mb-1"
            }
            disabled={noOfElement <= 4 || modelReg || modelInfoOpen || modelDelete}
            onClick={() => loadLess()}
          >
            Load Less &nbsp;
            <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
          </button>
          <div className="mb-5"></div>
        </div>
        <motion.nav
          animate={show ? "open" : "closed"}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={modelReg || modelInfoOpen || modelDelete ? "openModel" : ""}
          >
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
            {/* sort */}
            <div>
              <button
                className={
                  theme ? " btn btn-dark btn-one" : "btn btn-primary btn-one"
                }
                disabled={littleNameArr || filter}
                onClick={() => {
                  setHighPriceArr(false);
                  setLowPriceArr(false);
                  setLittleNameArr(true);
                  setBigNameArr(false);
                  setShow(false);
                }}
              >
                A &nbsp;
                <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
                &nbsp; Z
              </button>

              <button
                className={
                  theme ? " btn btn-dark btn-two" : "btn btn-primary btn-two"
                }
                disabled={bigNameArr || filter}
                onClick={() => {
                  setHighPriceArr(false);
                  setLowPriceArr(false);
                  setLittleNameArr(false);
                  setBigNameArr(true);
                  setShow(false);
                }}
              >
                Z &nbsp;
                <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
                &nbsp; A
              </button>

              <button
                className={
                  theme
                    ? "btn btn-dark btn-three"
                    : "btn btn-primary btn-three"
                }
                disabled={highPriceArr || filter}
                onClick={() => {
                  setHighPriceArr(true);
                  setLowPriceArr(false);

                  setLittleNameArr(false);
                  setBigNameArr(false);
                  setShow(false);
                }}
              >
                Price High To Low &nbsp;
                <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
              </button>

              <button
                className={
                  theme ? " btn btn-dark btn-four" : "btn btn-primary btn-four"
                }
                disabled={lowPriceArr || filter}
                onClick={() => {
                  setHighPriceArr(false);
                  setLowPriceArr(true);

                  setLittleNameArr(false);
                  setBigNameArr(false);
                  setShow(false);
                }}
              >
                Price Low To High &nbsp;
                <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
              </button>
            </div>
          </motion.div>
        </motion.nav>
        {!modelReg && !modelDelete && !modelInfoOpen && !show ? (
          <motion.button
            className="toggle arrow"
            onClick={() => setShow((show) => !show)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
          >
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </motion.button>
        ) : !modelReg && !modelDelete && !modelInfoOpen && show ? (
          <motion.button
            className="toggle x"
            onClick={() => setShow((show) => !show)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
          >
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </motion.button>
        ) : (modelReg || modelDelete || modelInfoOpen) && !show ? (
          <motion.button
            className="toggle arrow openModel2"
            onClick={() => setShow((show) => !show)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
          >
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </motion.button>
        ) : (modelReg || modelDelete || modelInfoOpen) && show ? (
          <motion.button
            className="toggle x openModel"
            onClick={() => setShow((show) => !show)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
          >
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </motion.button>
        ) : null}
      </div>
    </div>
  );
};
 
export default Products;