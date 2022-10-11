import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategory } from "../services/categoriesServices";
import CategoryCard from "../components/main/categories/categoryCard";
import {
  getCurrentUser,
} from "../services/usersServices";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";




const Categories = ({theme, setTheme}) => {
  // Get User Info From Token
  const user = getCurrentUser();

  // Get All Category And Sort
  const [categoryArr, setCategoryArr] = useState([]);

  useEffect(() => {
    getAllCategory().then((res) => setCategoryArr(res.data));
  }, []);

  categoryArr.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  // Search Category
  const [filter, setFilter] = useState("");

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  const dataSearch = categoryArr.filter((item) => {
    return item.name
      .toLowerCase()
      .includes(filter.toLowerCase() || Number(filter));
  });

  // Slider
  const [noOfElement, setNoOfElement] = useState(4);

  const loadMore = () => {
    if (categoryArr.length > noOfElement) {
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


  return (
    <>
      <div className={theme ? "theme-dark" : ""}>
        <div className="categories-page">
          <h1 className="text-center title-shop">Shop</h1>
          {user?.isAdmin ? (
            <div className="col-12 mb-2">
              <Link to={`/categories/create`}>
                <button className="btn btn-primary fs-5 btn-create ">
                  Create Category
                </button>
              </Link>
            </div>
          ) : null}
          <h3 className="from-label h4 search-location mt-4 ms-1">
            {" "}
            Search: &nbsp;
          </h3>
          <input
            type="text"
            className="from-control search-location ms-1 mb-2"
            value={filter}
            onChange={(e) => {
              searchText(e);
            }}
          />

          <div className="row justify-content-center mt-5">
            {filter.length === 0 &&
              categoryArr.slice(0, noOfElement).map((item, index) => {
                return <CategoryCard key={index} item={item} />;
              })}

            {filter.length > 0 && dataSearch.length > 0 ? (
              dataSearch.slice(0, noOfElement).map((item, index) => {
                return <CategoryCard key={index} item={item} />;
              })
            ) : filter.length > 0 && dataSearch.length === 0 ? (
              <h1 className="text-center mb-4"> Category Doesn't Found</h1>
            ) : null}

            <button
              disabled={
                (noOfElement >= dataSearch.length && dataSearch.length > 0) ||
                (noOfElement >= categoryArr.length && categoryArr.length > 0) ||
                (filter.length >= 1 && dataSearch.length <= 0)
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
              disabled={noOfElement <= 4}
              onClick={() => loadLess()}
            >
              Load Less &nbsp;
              <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
            </button>
            <div className="mb-5"></div>
          </div>
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

export default Categories;
