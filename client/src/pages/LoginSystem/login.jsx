import React, { useState, useEffect, useRef } from "react";
import {
  loginUser,
  findUserByEmail,
  getCurrentUser,
} from "../../services/usersServices";
import loginSchema from "../../validation/userValidation/loginValidation";
import joi from "joi-browser";
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
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{6,30}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Login = ({ theme, setTheme }) => {
  const user = getCurrentUser();

  // Side Navbar
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [verify, setVerify] = useState(false);
  const [block, setBlock] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [emailNotExist, setEmailNotExist] = useState(false);

  const emailRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const handleOnSubmit = async (ev) => {
    if (ev) {
      ev.preventDefault();
    }
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PASSWORD_REGEX.test(password);

    if (!v1 || !v2) {
      setErrMsg("invalid Entry");
      return;
    }

    ev.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    const theUserFound = await findUserByEmail(user.email);

    try {
      const validatedValue = joi.validate({ email, password }, loginSchema, {
        abortEarly: false,
      });

      const { error } = validatedValue;

      if (!error) {
        await loginUser(user);
        toast.success(
          `${theUserFound.data[0].userName} you login successfully`
        );
        window.location = "/";
      }
    } catch (err) {
      if (theUserFound.data[0] !== undefined) {
        if (
          err.response.status === 400 &&
          theUserFound.data[0].verify === false
        ) {
          setVerify(true);
          setEmailNotExist(false);
          setWrongPassword(false);
          setBlock(false);
        } else if (
          err.response.status === 400 &&
          theUserFound.data[0].block === true
        ) {
          setBlock(true);
          setVerify(false);
          setEmailNotExist(false);
          setWrongPassword(false);
        } else {
          setWrongPassword(true);
          setVerify(false);
          setEmailNotExist(false);
          setBlock(false);
          setValidPassword(false);
        }
      } else {
        setEmailNotExist(true);
        setVerify(false);
        setBlock(false);
        setWrongPassword(false);
        setValidEmail(false);
        setValidPassword(false);
      }
    }
  };

  return (
    <>
      {user && <Navigate to="/" />}
      <div className={theme ? "theme-dark long" : "long"}>
        <div className="main container">
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <form onSubmit={handleOnSubmit}>
                <br />
                <div className="fadeIn first">
                  <h1 className="text-center title-shop">Login</h1>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label label-dark ">
                    Email:
                    <span className={validEmail ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <br />
                  <input
                    type="email"
                    className={
                      validEmail
                        ? "form-control green-input"
                        : "form-control red-input"
                    }
                    id="email"
                    onChange={handleEmailChange}
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    ref={emailRef}
                    autoComplete="off"
                    required
                  />
                  {theme ? (
                    <p
                      id="emailnote"
                      className={
                        emailFocus && email && !validEmail
                          ? "instructions-dark"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      You Need An Email To Continue
                    </p>
                  ) : (
                    <p
                      id="emailnote"
                      className={
                        emailFocus && email && !validEmail
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      You Need An Email To Continue
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label label-dark">
                    Password:
                    <span className={validPassword ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validPassword || !password ? "hide" : "invalid"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="password"
                    className={
                      validPassword
                        ? "form-control green-input"
                        : "form-control red-input"
                    }
                    id="password"
                    aria-describedby="pwdnote"
                    onChange={handlePasswordChange}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    autoComplete="off"
                    required
                  />
                  {theme ? (
                    <p
                      id="pwdnode"
                      className={
                        passwordFocus && !validPassword
                          ? "instructions-dark"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      You Need 6 To 30 Characters. <br />
                      Must Include At least 1 big Letter, 1 small letter, 1
                      number and 1 sign.
                    </p>
                  ) : (
                    <p
                      id="pwdnode"
                      className={
                        passwordFocus && !validPassword
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      You Need 6 To 30 Characters. <br />
                      Must Include At least 1 big Letter, 1 small letter, 1
                      number and 1 sign.
                    </p>
                  )}
                </div>

                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                {verify ? (
                  <p
                    ref={errRef}
                    className={verify ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    "You need to verify your account"
                  </p>
                ) : null}

                {block ? (
                  <p
                    ref={errRef}
                    className={block ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    "Your account is blocked"
                  </p>
                ) : null}

                {wrongPassword ? (
                  <p
                    ref={errRef}
                    className={wrongPassword ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    "The Password is wrong"
                  </p>
                ) : null}

                {emailNotExist ? (
                  <p
                    ref={errRef}
                    className={emailNotExist ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    "The email doesn't exist"
                  </p>
                ) : null}

                <NavLink to="forget_password">
                  <h6 className="text-primary text-decoration-underline">
                    Forget Password
                  </h6>
                </NavLink>
                <button type="submit" className="btn btn-primary">
                  Sign Up
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

export default Login;
