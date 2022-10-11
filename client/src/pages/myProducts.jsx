import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import ProductCard from "../components/main/products/productCard";

import { getMyProducts } from "../services/productServices";
import { getCurrentUser } from "../services/usersServices";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faXmark,
  faArrowRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

import DeleteAllProducts from "../components/main/products/deleteAllProducts";

import { Navigate } from "react-router";


const MyProducts = ({
  theme,
  setTheme,
}) => {

  const user = getCurrentUser();

  const [myProducts, setMyProducts] = useState([]);

  const [modelDeleteAll, setModelDeleteAll] = useState(false);

  const [modelInfoOpen, setModelInfoOpen] = useState(false);

  useEffect(() => {
    getMyProducts().then((res) => setMyProducts(res.data));
  }, []);

  myProducts.sort((a, b) =>
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

  const dataSearch = myProducts.filter((item) => {
    return item.name
      .toLowerCase()
      .includes(filter.toLowerCase() || Number(filter));
  });

  // Slider
  const [noOfElement, setNoOfElement] = useState(4);

  const loadMore = () => {
    if (myProducts.length > noOfElement) {
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

  const [modelDelete, setModelDelete] = useState(false);


  return (
    <>
      {!user?.biz && !user?.admin && <Navigate to="/" />}
      <div className={theme ? "theme-dark" : ""}>
        <div className="categories-page">
          <h1
            className={
              modelDelete || modelInfoOpen || modelDeleteAll
                ? "text-center title-shop openModel"
                : "text-center title-shop"
            }
          >
            My Products
          </h1>
          {user?.isAdmin || user?.biz ? (
            <div className="col-12 mb-2">
              <Link to={`/products/create`}>
                <button
                  className={
                    modelDelete || modelInfoOpen || modelDeleteAll
                      ? "btn btn-primary fs-5 btn-create openModel"
                      : "btn btn-primary fs-5 btn-create"
                  }
                >
                  Create Product
                </button>
              </Link>
            </div>
          ) : null}

          {myProducts.length >= 1 ? (
            <div>
              <h3
                className={
                  modelDelete || modelInfoOpen || modelDeleteAll
                    ? "from-label h4 search-location mt-4 ms-1 openModel"
                    : "from-label h4 search-location mt-4 ms-1"
                }
              >
                Search:
              </h3>
              <input
                type="text"
                className={
                  modelDelete || modelInfoOpen || modelDeleteAll
                    ? "from-control search-location ms-1 mb-2 openModel"
                    : "from-control search-location ms-1 mb-2"
                }
                value={filter}
                onChange={(e) => {
                  searchText(e);
                }}
              />
            </div>
          ) : (
            <h1 className="text-center mt-5"> You don't have any products..</h1>
          )}
          <div className="row justify-content-center mt-4">
            {/* Sort A => Z */}
            {filter.length === 0 && littleNameArr
              ? myProducts.slice(0, noOfElement).map((item, index) => {
                  return (
                    <ProductCard
                      key={index}
                      item={item}
                      modelInfoOpen={modelInfoOpen}
                      setModelInfoOpen={setModelInfoOpen}
                      modelDelete={modelDelete}
                      setModelDelete={setModelDelete}
                      modelDeleteAll={modelDeleteAll}
                    />
                  );
                })
              : null}

            {/* Sort Z => A */}
            {filter.length === 0 && bigNameArr
              ? myProducts
                  .sort((a, b) => (a.name < b.name ? 1 : -1))
                  .slice(0, noOfElement)
                  .map((item, index) => {
                    return (
                      <ProductCard
                        key={index}
                        item={item}
                        modelInfoOpen={modelInfoOpen}
                        setModelInfoOpen={setModelInfoOpen}
                        modelDelete={modelDelete}
                        setModelDelete={setModelDelete}
                        modelDeleteAll={modelDeleteAll}
                      />
                    );
                  })
              : null}

            {/* Price High Sort */}
            {filter.length === 0 && highPriceArr
              ? myProducts
                  .sort((a, b) => (a.price < b.price ? 1 : -1))
                  .slice(0, noOfElement)
                  .map((item, index) => {
                    return (
                      <ProductCard
                        key={index}
                        item={item}
                        modelInfoOpen={modelInfoOpen}
                        setModelInfoOpen={setModelInfoOpen}
                        modelDelete={modelDelete}
                        setModelDelete={setModelDelete}
                        modelDeleteAll={modelDeleteAll}
                      />
                    );
                  })
              : null}

            {/* Price Low Sort */}
            {filter.length === 0 && lowPriceArr
              ? myProducts
                  .sort((a, b) => (a.price > b.price ? 1 : -1))
                  .slice(0, noOfElement)
                  .map((item, index) => {
                    return (
                      <ProductCard
                        key={index}
                        item={item}
                        modelInfoOpen={modelInfoOpen}
                        setModelInfoOpen={setModelInfoOpen}
                        modelDelete={modelDelete}
                        setModelDelete={setModelDelete}
                        modelDeleteAll={modelDeleteAll}
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
                    modelInfoOpen={modelInfoOpen}
                    setModelInfoOpen={setModelInfoOpen}
                    modelDelete={modelDelete}
                    setModelDelete={setModelDelete}
                    modelDeleteAll={modelDeleteAll}
                  />
                );
              })
            ) : filter.length > 0 && dataSearch.length === 0 ? (
              <h1 className="text-center mb-4"> Product Doesn't Found</h1>
            ) : null}

            {myProducts.length > 0 ? (
              <div
                className={
                  modelDelete || modelInfoOpen || modelDeleteAll
                    ? "col-12 mb-2 openModel"
                    : "col-12 mb-2"
                }
              >
                <button
                  className="btn btn-danger fs-5 btn-create col mb-2"
                  onClick={() => setModelDeleteAll(true)}
                >
                  Delete All
                </button>
              </div>
            ) : null}

            <button
              disabled={
                (noOfElement >= dataSearch.length && dataSearch.length > 0) ||
                (noOfElement >= myProducts.length && myProducts.length > 0) ||
                (filter.length >= 1 && dataSearch.length <= 0) ||
                myProducts.length === 0 ||
                modelDelete ||
                modelInfoOpen ||
                modelDeleteAll
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
              disabled={
                noOfElement <= 4 ||
                modelDelete ||
                modelInfoOpen ||
                modelDeleteAll
              }
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
              className={
                modelDeleteAll || modelInfoOpen || modelDelete
                  ? "openModel"
                  : ""
              }
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
                      ? " btn btn-dark btn-three"
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
                    theme
                      ? " btn btn-dark btn-four"
                      : "btn btn-primary btn-four"
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
          {!modelDeleteAll && !modelDelete && !modelInfoOpen && !show ? (
            <motion.button
              className="toggle arrow"
              onClick={() => setShow((show) => !show)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
            >
              <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </motion.button>
          ) : !modelDeleteAll && !modelDelete && !modelInfoOpen && show ? (
            <motion.button
              className="toggle x"
              onClick={() => setShow((show) => !show)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
            >
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </motion.button>
          ) : (modelDeleteAll || modelDelete || modelInfoOpen) && !show ? (
            <motion.button
              className="toggle arrow openModel2"
              onClick={() => setShow((show) => !show)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
            >
              <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </motion.button>
          ) : (modelDeleteAll || modelDelete || modelInfoOpen) && show ? (
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
        {modelDeleteAll ? (
          <DeleteAllProducts setModelDeleteAll={setModelDeleteAll} />
        ) : null}
      </div>
    </>
  );
};

export default MyProducts;
