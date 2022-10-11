import React, { useState } from "react";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faArrowDown,
  faArrowUp,
  faArrowRight,
  faXmark,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";


const Cart = ({cart, setCart, theme, setTheme, removeToCart}) => {
  function increase(item) {
    let x = cart.map((i) => {
      if (item._id === i._id) {
        i.quantity += 1;
      }
      return i;
    });
    setCart(x);
  }

  console.log(cart)

  function decrease(item) {
    let x = cart.map((i) => {
      if (item._id === i._id && i.quantity > 0) {
        i.quantity -= 1;
      }
      return i;
    });
    setCart(x);
  }

  function totalPrice() {
    let x = 0;
    cart.map((i) => {
      x += i.price * i.quantity;
    });
    return x;
  }

  // Side Navbar
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const [show, setShow] = useState(false);

  // Sort By...
  const [littleNameArr, setLittleNameArr] = useState(true);
  const [bigNameArr, setBigNameArr] = useState(false);
  const [highPriceArr, setHighPriceArr] = useState(false);
  const [lowPriceArr, setLowPriceArr] = useState(false);

  return (
    <>
      <div className={theme ? "theme-dark" : ""}>
        <div
          className={
            cart.length < 5
              ? "content-bg-color main-content page-height"
              : "content-bg-color main-content"
          }
        >
          <div className="col-12 mb-2">
            <h1 className="text-center title-shop"> My Cart </h1>
            {cart.length === 0 ? (
              <div>
                <h2 className="ms-4 mt-5 text-center">
                  Your Cart It's Empty...
                </h2>
              </div>
            ) : null}
          </div>
          <div className=" ms-5 col-7 mt-5">
            <div className="row mt-3 table-mobile">
              <table className="table text-center">
                {cart.length > 0 ? (
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col" className="th-one">
                        Product
                      </th>
                      <th scope="col">
                        Name &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="arrow-th"
                          onClick={() => {
                            setLittleNameArr(true);
                            setBigNameArr(false);
                            setLowPriceArr(false);
                            setHighPriceArr(false);
                          }}
                        ></FontAwesomeIcon>
                        &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          className="arrow-th"
                          onClick={() => {
                            setLittleNameArr(false);
                            setBigNameArr(true);
                            setLowPriceArr(false);
                            setHighPriceArr(false);
                          }}
                        ></FontAwesomeIcon>
                      </th>
                      <th scope="col">
                        Price &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="arrow-th"
                          onClick={() => {
                            setLittleNameArr(false);
                            setBigNameArr(false);
                            setLowPriceArr(true);
                            setHighPriceArr(false);
                          }}
                        ></FontAwesomeIcon>
                        &nbsp;
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          className="arrow-th"
                          onClick={() => {
                            setLittleNameArr(false);
                            setBigNameArr(false);
                            setLowPriceArr(false);
                            setHighPriceArr(true);
                          }}
                        ></FontAwesomeIcon>
                      </th>
                      <th scope="col">Total Price &nbsp;</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {/* Low Name */}
                  {littleNameArr
                    ? cart
                        .sort((a, b) => (a.name > b.name ? 1 : -1))

                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.name}
                            </td>
                            <td>
                              <b className="mobile-title">Price: &nbsp;</b>
                              {i.price}$
                            </td>
                            <td>
                              <b className="mobile-title">
                                Total Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>

                            <td>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary btn-sm d-inline button-cart"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>

                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pieces === i.quantity}
                                className="btn btn-primary btn-sm d-inline button-cart"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger btn-sm button-cart"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}
                  {/* High Name */}
                  {bigNameArr
                    ? cart
                        .sort((a, b) => (a.name < b.name ? 1 : -1))
                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.name}
                            </td>
                            <td>
                              <b className="mobile-title">Price: &nbsp;</b>
                              {i.price}$
                            </td>
                            <td>
                              <b className="mobile-title">
                                Total Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>

                            <td>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary btn-sm d-inline button-cart"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>

                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pieces === i.quantity}
                                className="btn btn-primary btn-sm d-inline button-cart"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger btn-sm button-cart"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}

                  {/* Low Price */}
                  {lowPriceArr
                    ? cart
                        .sort((a, b) => (a.price > b.price ? 1 : -1))
                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.name}
                            </td>
                            <td>
                              <b className="mobile-title">Price: &nbsp;</b>
                              {i.price}$
                            </td>
                            <td>
                              <b className="mobile-title">
                                Total Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>

                            <td>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary btn-sm d-inline button-cart"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>

                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pieces === i.quantity}
                                className="btn btn-primary btn-sm d-inline button-cart"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger btn-sm button-cart"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}

                  {/* High Price */}
                  {highPriceArr
                    ? cart
                        .sort((a, b) => (a.price < b.price ? 1 : -1))
                        .map((i, index) => (
                          <tr key={i.id}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">
                              <img src={i.url} style={{ width: "4rem" }} />
                            </th>
                            <td>
                              <b className="mobile-title">Name: &nbsp;</b>
                              {i.name}
                            </td>
                            <td>
                              <b className="mobile-title">Price: &nbsp;</b>
                              {i.price}$
                            </td>
                            <td>
                              <b className="mobile-title">
                                Total Price: &nbsp;
                              </b>
                              {i.quantity * i.price}$
                            </td>

                            <td>
                              <button
                                onClick={() => decrease(i)}
                                className="btn btn-primary btn-sm d-inline button-cart"
                                disabled={i.quantity === 0}
                              >
                                -
                              </button>
                              <h6 className="ms-1 me-1 d-inline">
                                {i.quantity}
                              </h6>
                              <button
                                onClick={() => increase(i)}
                                disabled={i.pieces === i.quantity}
                                className="btn btn-primary btn-sm d-inline button-cart"
                                size="sm"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeToCart(i)}
                                className="btn btn-danger btn-sm button-cart"
                                size="sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <motion.nav
              animate={show ? "open" : "closed"}
              variants={variants}
              transition={{ duration: 0.5 }}
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
                <div>
                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-one"
                        : "btn btn-primary btn-one"
                    }
                    disabled={littleNameArr || cart.length < 2}
                    onClick={() => {
                      setLittleNameArr(true);
                      setBigNameArr(false);
                      setLowPriceArr(false);
                      setHighPriceArr(false);
                    }}
                  >
                    A &nbsp;
                    <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
                    &nbsp; Z
                  </button>
                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-two"
                        : "btn btn-primary btn-two"
                    }
                    disabled={bigNameArr || cart.length < 2}
                    onClick={() => {
                      setLittleNameArr(false);
                      setBigNameArr(true);
                      setLowPriceArr(false);
                      setHighPriceArr(false);
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
                    disabled={lowPriceArr || cart.length < 2}
                    onClick={() => {
                      setLittleNameArr(false);
                      setBigNameArr(false);
                      setLowPriceArr(true);
                      setHighPriceArr(false);
                    }}
                  >
                    Price Low To High &nbsp;
                    <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                  </button>
                  <button
                    className={
                      theme
                        ? " btn btn-dark btn-four"
                        : "btn btn-primary btn-four"
                    }
                    disabled={highPriceArr || cart.length < 2}
                    onClick={() => {
                      setLittleNameArr(false);
                      setBigNameArr(false);
                      setLowPriceArr(false);
                      setHighPriceArr(true);
                    }}
                  >
                    Price High To Low &nbsp;
                    <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                  </button>
                </div>
              </motion.div>
            </motion.nav>
          </div>

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
          <div className="row total-cart">
            {cart.length >= 1 ? (
              <div className="card p-0 overflow-hidden col-3 shadow">
                <h5 className="mt-4 ms-4 fs-2">
                  <b>Summary</b>
                </h5>
                <h5 className="my-3 ms-4 fs-3">Total Price: {totalPrice()}$</h5>
                <h5 className="mb-2 ms-4 fs-3">Free Shipping</h5>

                <button className="btn btn-primary fs-5 ms-4 cart-buy-now">
                  Buy Now
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
 
export default Cart;