import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../../../services/usersServices";
import { Link } from "react-router-dom";
import DeleteProduct from "./deleteProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCartArrowDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import ProductInfo from "./InfoProduct";
import ModelReg from "../login/modelReg"


const ProductCard = ({
  item,
  addToCart,
  modelReg,
  setModelReg,
  addToFavorite,
  removeToFavorite,
  setModelInfoOpen,
  modelDelete,
  setModelDelete,
  modelInfoOpen,
  modelDeleteAll,
}) => {
  const user = getCurrentUser();

  const [myProductsPage, setMyProductsPage] = useState(false);
  const [myFavoritePage, setMyFavoritePage] = useState(false);
  const [modelInfo, setModelInfo] = useState(false);

  const theName = item.name;

  const name = theName.charAt(0).toUpperCase() + theName.slice(1).toLowerCase();

  const urlSite = window.location.href;
  const urlWordsArr = urlSite.split("/");

  useEffect(() => {
    if (urlWordsArr[3] === "my_products") {
      setMyProductsPage(true);
    } else {
      setMyProductsPage(false);
    }
  }, []);

  useEffect(() => {
    if (urlWordsArr[3] === "my_favorite") {
      setMyFavoritePage(true);
    } else {
      setMyFavoritePage(false);
    }
  }, []);

  return (
    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
      <div className="card p-0 overflow-hidden h-100 shadow">
        <div
          className={
            modelReg || modelDelete || modelInfoOpen || modelDeleteAll
              ? "card-body openModel"
              : "card-body"
          }
        >
          <img src={item.url} alt={item.alt} className="card-img" />
        </div>
        <div className="text-center ">
          <h5
            className={
              modelReg || modelDelete || modelInfoOpen || modelDeleteAll
                ? "item-name openModel"
                : "item-name"
            }
          >
            {name}
          </h5>

          <button
            className={
              modelReg || modelDelete || modelInfoOpen || modelDeleteAll
                ? "btn btn-primary d-block btn-inf openModel"
                : "btn btn-primary d-block btn-inf"
            }
            onClick={() => {
              setModelInfo(true);
              setModelInfoOpen(true);
            }}
          >
            Info
          </button>

          {!user ? (
            <button
              className={
                modelReg || modelDelete || modelInfoOpen || modelDeleteAll
                  ? "btn btn-primary mb-3 openModel"
                  : "btn btn-primary mb-3"
              }
              onClick={() => setModelReg(true)}
            >
              <span className="fs-6">
                Add To Cart &nbsp;
                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
              </span>
            </button>
          ) : item.pieces > 0 &&
            item.cart === true &&
            user?._id !== item.createdBy &&
            !myProductsPage ? (
            <button
              className="btn btn-danger mb-3"
              onClick={() => addToCart(item)}
              disabled={true}
            >
              <span className="fs-6">
                In The Cart &nbsp;
                <FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon>
              </span>
            </button>
          ) : item.cart === false &&
            item.pieces > 0 &&
            user?._id !== item.createdBy &&
            !myProductsPage ? (
            <button
              className={
                modelInfoOpen
                  ? "btn btn-primary mb-3 openModel"
                  : "btn btn-primary mb-3"
              }
              onClick={() => addToCart(item)}
            >
              <span className="fs-6">
                Add To Cart &nbsp;
                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
              </span>
            </button>
          ) : item.createdBy === user?._id && !myProductsPage
           ? (
            <button className="btn btn-danger mb-3" disabled={true}>
              {" "}
              It's Your Product
            </button>
          ) : item.pieces === 0 &&
            user?._id !== item.createdBy &&
            !myProductsPage &&
            !myFavoritePage ? (
            <button className="btn btn-danger mb-3" disabled={true}>
              <span className="fs-6">
                Sold Out &nbsp;
                <FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon>
              </span>
            </button>
          ) : null}

          {!user ? (
            <button
              className={
                modelReg || modelDelete || modelInfoOpen || modelDeleteAll
                  ? "btn btn-secondary ms-2 mb-3 openModel"
                  : "btn btn-secondary ms-2 mb-3"
              }
              onClick={() => setModelReg(true)}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="fs-5"
              ></FontAwesomeIcon>
            </button>
          ) : user &&
            user?._id !== item.createdBy &&
            !item.like &&
            !myProductsPage &&
            !myFavoritePage ? (
            <button
              className={
                modelReg || modelDelete || modelInfoOpen || modelDeleteAll
                  ? "btn btn-secondary ms-2 mb-3 openModel"
                  : "btn btn-secondary ms-2 mb-3"
              }
              onClick={() => addToFavorite(item)}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="fs-5"
              ></FontAwesomeIcon>
            </button>
          ) : item.like && !myFavoritePage ? (
            <button
              className={
                modelReg || modelDelete || modelInfoOpen || modelDeleteAll
                  ? "btn btn-primary ms-2 mb-3 openModel"
                  : "btn btn-primary ms-2 mb-3"
              }
              disabled={true}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="fs-5"
              ></FontAwesomeIcon>
            </button>
          ) : myFavoritePage ? (
            <button
              className={
                modelReg || modelDelete || modelInfoOpen || modelDeleteAll
                  ? "btn btn-primary ms-2 mb-3 openModel"
                  : "btn btn-primary ms-2 mb-3"
              }
              onClick={() => removeToFavorite(item)}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="fs-5"
              ></FontAwesomeIcon>
            </button>
          ) : null}

          {myProductsPage ? (
            <div>
              <button
                className={
                  modelReg || modelDelete || modelInfoOpen || modelDeleteAll
                    ? "btn btn-outline-danger button-card mt-3 mb-3 openModel"
                    : "btn btn-outline-danger button-card mt-3 mb-3"
                }
                onClick={() => setModelDelete(true)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/dovoajyj.json"
                  trigger="hover"
                  title="Delete"
                ></lord-icon>
              </button>
              <Link to={`/products/update/${item._id}`}>
                <button
                  className={
                    modelReg || modelDelete || modelInfoOpen || modelDeleteAll
                      ? "btn btn-outline-warning mt-3 button-card mb-3 ms-2 openModel"
                      : "btn btn-outline-warning mt-3 button-card mb-3 ms-2"
                  }
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/oclwxpmm.json"
                    trigger="hover"
                    title="Edit"
                  ></lord-icon>
                </button>
              </Link>
            </div>
          ) : null}

          {modelDelete ? (
            <DeleteProduct item={item} setModelDelete={setModelDelete} />
          ) : null}

          {modelInfo ? (
            <ProductInfo
              setModelInfo={setModelInfo}
              item={item}
              addToCart={addToCart}
              setModelReg={setModelReg}
              modelReg={modelReg}
              user={user}
              setModelInfoOpen={setModelInfoOpen}
            />
          ) : null}

          {modelReg ? (
            <ModelReg setModelReg={setModelReg} modelReg={modelReg} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
