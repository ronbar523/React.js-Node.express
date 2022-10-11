import React, { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "../../../services/usersServices";
import {
  updateProductById,
  getProductById,
} from "../../../services/productServices";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
import { motion } from "framer-motion";


const NAME_REGEX = /^[A-Za-z\s]{1,15}$/;
const URL_REGEX = /^[A-Za-z0-9@:%._\/+~#-=]{1,1024}$/;
const ALT_REGEX = /^[A-Za-z0-9]{3,15}$/;
const PRICE_REGEX = /[a-z0-9]{1,6}$/;
const PIECES_REGEX = /[a-z0-9]{0,6}$/;;
const CATEGORY_REGEX = /^[A-Za-z\s]{2,15}$/;
const DESCRIPTION_REGEX = /^[A-Za-z0-9!@#$%^&*()_+-=<>,.?;:\s]{1,1024}$/;

const UpdateProduct = ({ theme, setTheme}) => {
  const user = getCurrentUser();
  const isAdmin = user?.isAdmin;
  const biz = user?.biz;

  // Side Navbar
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const [show, setShow] = useState(false);

  const urlSite = window.location.href;
  const urlWordsArr = urlSite.split("/");
  const id = urlWordsArr[5];

  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, []);

  const [name, setName] = useState(product.name);
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [url, setUrl] = useState(product.url);
  const [validUrl, setValidUrl] = useState(false);
  const [urlFocus, setUrlFocus] = useState(false);

  const [alt, setAlt] = useState(product.alt);
  const [validAlt, setValidAlt] = useState(false);
  const [altFocus, setAltFocus] = useState(false);

  const [category, setCategory] = useState(product.category);
  const [validCategory, setValidCategory] = useState(false);
  const [categoryFocus, setCategoryFocus] = useState(false);

  const [description, setDescription] = useState(product.description);
  const [validDescription, setValidDescription] = useState(false);
  const [descriptionFocus, setDescriptionFocus] = useState(false);

  const [price, setPrice] = useState(product.price);
  const [validPrice, setValidPrice] = useState(false);
  const [priceFocus, setPriceFocus] = useState(false);

  const [pieces, setPieces] = useState(product.pieces);
  const [validPieces, setValidPieces] = useState(false);
  const [piecesFocus, setPiecesFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const nameRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = ALT_REGEX.test(alt);
    setValidAlt(result);
  }, [alt]);

  useEffect(() => {
    const result = URL_REGEX.test(url);
    setValidUrl(result);
  }, [url]);

  useEffect(() => {
    const result = CATEGORY_REGEX.test(category);
    setValidCategory(result);
  }, [category]);

  useEffect(() => {
    const result = DESCRIPTION_REGEX.test(description);
    setValidDescription(result);
  }, [description]);

  useEffect(() => {
    const result = PRICE_REGEX.test(price);
    setValidPrice(result);
  }, [price]);

  useEffect(() => {
    const result = PIECES_REGEX.test(pieces);
    setValidPieces(result);
  }, [pieces]);

  useEffect(() => {
    setErrMsg("");
  }, [name, url, alt, category, description, price, pieces]);

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };
  const handleUrlChange = (ev) => {
    setUrl(ev.target.value);
  };
  const handleAltChange = (ev) => {
    setAlt(ev.target.value);
  };

  const handleCategoryChange = (ev) => {
    setCategory(ev.target.value);
  };

  const handleDescriptionChange = (ev) => {
    setDescription(ev.target.value);
  };

  const handlePriceChange = (ev) => {
    setPrice(ev.target.value);
  };

  const handlePiecesChange = (ev) => {
    setPieces(ev.target.value);
  };

  const handleOnSubmit = async (ev) => {
    if (ev) {
      ev.preventDefault();
    }
    const v1 = NAME_REGEX.test(name);
    const v2 = URL_REGEX.test(url);
    const v3 = ALT_REGEX.test(alt);
    const v4 = CATEGORY_REGEX.test(category);
    const v5 = PRICE_REGEX.test(price);
    const v6 = DESCRIPTION_REGEX.test(description);
    const v7 = PIECES_REGEX.test(pieces);

    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7) {
      setErrMsg("invalid Entry");
      return;
    }

    ev.preventDefault();
    const productUpdated = {
      name: name,
      category: category,
      price: price,
      pieces: pieces,
      description: description,
      url: url,
      alt: alt,
    };

    if (productUpdated.name === undefined) {
      productUpdated.name = product.name;
    }
    if (productUpdated.url === undefined) {
      productUpdated.url = product.url;
    }
    if (productUpdated.alt === undefined) {
      productUpdated.alt = product.alt;
    }
    if (productUpdated.category === undefined) {
      productUpdated.category = product.category;
    }
    if (productUpdated.description === undefined) {
      productUpdated.description = product.description;
    }
    if (productUpdated.price === undefined) {
      productUpdated.price = product.price;
    }
    if (productUpdated.pieces === undefined) {
      productUpdated.pieces = product.pieces;
    }

    try {
      await updateProductById(id, productUpdated);
      toast.success(`product updated successfully`);
      window.location = `/my_products`;
    } catch (err) {
      // console.log(err)
    }
  };

  return (
    <>
      {!user && <Navigate to="/" />}
      {!isAdmin || (!biz && <Navigate to="/" />)}
      <div className={theme ? "theme-dark long-product" : "long-product"}>
        <div className="main container">
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <form onSubmit={handleOnSubmit}>
                <div className="fadeIn first">
                  <h1 className="text-center title-shop">
                    Update {product.name}
                  </h1>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label label-dark">
                    Name:
                    <span className={validName ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !name ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="text"
                    className={
                      validName
                        ? "form-control green-input"
                        : "form-control red-input"
                    }
                    id="name"
                    onChange={handleNameChange}
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="namenote"
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    ref={nameRef}
                    autoComplete="off"
                    defaultValue={product.name}
                    required
                  />
                  {theme ? (
                    <p
                      id="namenote"
                      className={
                        nameFocus && name && !validName
                          ? "instructions-dark"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must To Include 1 - 15 Characters
                    </p>
                  ) : (
                    <p
                      id="namenote"
                      className={
                        nameFocus && name && !validName
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must To Include 1 - 15 Characters
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="url" className="form-label label-dark">
                    URL:
                    <span className={validUrl ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validUrl || !url ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="text"
                    className={
                      validUrl
                        ? "form-control green-input"
                        : "form-control red-input"
                    }
                    id="url"
                    aria-describedby="urlnote"
                    onChange={handleUrlChange}
                    onFocus={() => setUrlFocus(true)}
                    onBlur={() => setUrlFocus(false)}
                    autoComplete="off"
                    defaultValue={product.url}
                    required
                  />
                  {theme ? (
                    <p
                      id="urlnote"
                      className={
                        urlFocus && !validUrl
                          ? "instructions-dark"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must Be URL
                    </p>
                  ) : (
                    <p
                      id="urlnote"
                      className={
                        urlFocus && !validUrl ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must Be URL
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="alt" className="form-label label-dark">
                    Alt:
                    <span className={validAlt ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validAlt || !alt ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>

                  <input
                    type="text"
                    className={
                      validAlt
                        ? "form-control green-input"
                        : "form-control red-input"
                    }
                    id="alt"
                    aria-describedby="altnote"
                    onChange={handleAltChange}
                    defaultValue={product.alt}
                    onFocus={() => setAltFocus(true)}
                    onBlur={() => setAltFocus(false)}
                    autoComplete="off"
                    required
                  />
                  {theme ? (
                    <p
                      id="altnote"
                      className={
                        altFocus && !validAlt ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must To Include 3 - 15 Characters
                    </p>
                  ) : (
                    <p
                      id="altnote"
                      className={
                        altFocus && !validAlt
                          ? "instructions-dark"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must To Include 3 - 15 Characters
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="form-label label-dark"
                  >
                    Description:
                    <span className={validDescription ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validDescription || !description ? "hide" : "invalid"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="text"
                    className={
                      validDescription
                        ? "form-control green-input"
                        : "form-control red-input"
                    }
                    id="description"
                    aria-describedby="descriptionnote"
                    defaultValue={product.description}
                    onChange={handleDescriptionChange}
                    onFocus={() => setDescriptionFocus(true)}
                    onBlur={() => setDescriptionFocus(false)}
                    autoComplete="off"
                    required
                  />
                  {theme ? (
                    <p
                      id="descriptionnote"
                      className={
                        descriptionFocus && !validDescription
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                       Must To Include 20 - 1024 Characters
                    </p>
                  ) : (
                    <p
                      id="descriptionnote"
                      className={
                        descriptionFocus && !validDescription
                          ? "instructions-dark"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                       Must To Include 20 - 1024 Characters
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label label-dark">
                    Price:
                    <span className={validPrice ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPrice || !price ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="number"
                    className={
                      validPrice
                        ? "form-control green-input"
                        : "form-control red-input"
                    }
                    id="price"
                    aria-describedby="pricenote"
                    onChange={handlePriceChange}
                    defaultValue={product.price}
                    onFocus={() => setPriceFocus(true)}
                    onBlur={() => setPriceFocus(false)}
                    autoComplete="off"
                    required
                  />
                  {theme ? (
                    <p
                      id="pricenote"
                      className={
                        priceFocus && !validPrice
                          ? "instructions-dark"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      It's Must To Be A Number 
                    </p>
                  ) : (
                    <p
                      id="pricenote"
                      className={
                        priceFocus && !validPrice ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      It's Must To Be A Number 
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="pieces" className="form-label label-dark">
                    Pieces:
                    <span className={validPieces ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={validPieces || !pieces ? "hide" : "invalid"}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="number"
                    className={
                      validPieces
                        ? "form-control green-input"
                        : "form-control red-input"
                    }
                    id="pieces"
                    aria-describedby="piecesnote"
                    onChange={handlePiecesChange}
                    defaultValue={product.pieces}
                    onFocus={() => setPiecesFocus(true)}
                    onBlur={() => setPiecesFocus(false)}
                    autoComplete="off"
                    required
                  />
                  {theme ? (
                    <p
                      id="piecesnote"
                      className={
                        piecesFocus && !validPieces
                          ? "instructions-dark"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      It's Must To Be A Number 
                    </p>
                  ) : (
                    <p
                      id="piecesnote"
                      className={
                        piecesFocus && !validPieces
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      It's Must To Be A Number 
                    </p>
                  )}
                </div>
                <label htmlFor="category" className="form-label label-dark">
                  Category:
                  <span className={validCategory ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validCategory || !category ? "hide" : "invalid"}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <select
                  className={
                    categoryFocus && !validCategory
                      ? "rounded-pill p-1 mt-1 mb-2 px-2 option-select red-input"
                      : "rounded-pill p-1 mt-1 mb-2 px-2 option-select green-input"
                  }
                  onChange={handleCategoryChange}
                  onFocus={() => setCategoryFocus(true)}
                  onBlur={() => setCategoryFocus(false)}
                >
                  <option value={""}>--Please choose an category--</option>

                  <option>Case Cover</option>
                  <option>Bracelet</option>
                  <option>Pillow</option>
                </select>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
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
      </div>
    </>
  );
};

export default UpdateProduct;
