import React, { useState, useEffect, useRef } from "react";
import { crateNewUser, getCurrentUser } from "../../services/usersServices";
import registerSchema from "../../validation/userValidation/registerValidation";
import joi from "joi-browser";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Navigate } from "react-router";


// user regex
const USER_NAME_REGEX = /^[A-Za-z\s.\(\)0-9]{2,10}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{6,30}$/
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/


const Register = ({ theme, setTheme }) => {
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

  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailExiting, setEmailExiting] = useState(false);
  const [errConfirm, setErrConfirm] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_NAME_REGEX.test(userName);
    setValidUserName(result);
  }, [userName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [userName, email, password, confirmPassword]);

  const handleNameChange = (ev) => {
    setUserName(ev.target.value);
  };
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handleConfirmPasswordChange = (ev) => {
    setConfirmPassword(ev.target.value);
  };

  const handleOnSubmit = async (ev) => {
    if (ev) {
      ev.preventDefault();
    }
    const v1 = USER_NAME_REGEX.test(userName);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PASSWORD_REGEX.test(password);

    if (!v1 || !v2 || !v3) {
      setErrMsg("invalid Entry");
      return;
    }

    try {
      const validatedValue = joi.validate(
        { email, password, userName },
        registerSchema,
        {
          abortEarly: false,
        }
      );

      const { error } = validatedValue;

      if (!error && password === confirmPassword) {
        setErrConfirm(false);
        setValidEmail(false);
        ev.preventDefault();
        const user = {
          email: email,
          password: password,
          userName: userName,
        };
        await crateNewUser(user);
        toast.success(`${user.userName} you register successfully`);
        setSuccess(true);
      } else {
        setErrConfirm(true);
      }
    } catch (err) {
      if (err.response.status === 400 && password === confirmPassword) {
        setEmailExiting(true);
      } else {
        setEmailExiting(false);
      }
    }
  };

  return (
    <>
      {user && <Navigate to="/" />}
      <div className={theme ? "theme-dark long" : ""}>
        <div className="main container">
          {success ? (
            <section className="register-success">
              <h1 className="text-center">
                Success!, Please Check Your Email For Confirm Your Account
              </h1>
            </section>
          ) : (
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <form onSubmit={handleOnSubmit}>
                  <br />
                  <div className="fadeIn first">
                    <h1 className="text-center title-shop">Register</h1>
                  </div>
                  <br />
                  <div className="mb-1">
                    <label htmlFor="userName" className="form-label label-dark">
                      User Name:
                      <span className={validUserName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validUserName || !userName ? "hide" : "invalid"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <br />
                    <input
                      type="text"
                      className={
                        validUserName
                          ? "form-control green-input"
                          : "form-control red-input"
                      }
                      id="userName"
                      ref={userRef}
                      onChange={handleNameChange}
                      aria-invalid={validUserName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserNameFocus(true)}
                      onBlur={() => setUserNameFocus(false)}
                      autoComplete="off"
                      required
                    />

                    {theme ? (
                      <p
                        id="uidnote"
                        className={
                          userNameFocus && userName && !validUserName
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        You Need 2 to 10 Characters. <br />
                        Letter, Numbers, Hyphens Allowed.
                      </p>
                    ) : (
                      <p
                        id="uidnote"
                        className={
                          userNameFocus && userName && !validUserName
                            ? "instructions-dark"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        You Need 2 to 10 Characters. <br />
                        Letter, Numbers, Hyphens Allowed.
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label label-dark">
                      Email:
                      <span className={validEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={validEmail || !email ? "hide" : "invalid"}
                      >
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
                  <div className="mb-3">
                    <label
                      htmlFor="confirm_pwd"
                      className="form-label label-dark"
                    >
                      Confirm Password:
                      <span
                        className={
                          validConfirmPassword && confirmPassword
                            ? "valid"
                            : "hide"
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validConfirmPassword || !confirmPassword
                            ? "hide"
                            : "invalid"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type="password"
                      className={
                        validConfirmPassword
                          ? "form-control green-input"
                          : "form-control red-input borderErr"
                      }
                      id="confirm_pwd"
                      onChange={handleConfirmPasswordChange}
                      aria-describedby="confirmnote"
                      aria-invalid={validConfirmPassword ? "false" : "true"}
                      onFocus={() => setConfirmPasswordFocus(true)}
                      onBlur={() => setConfirmPasswordFocus(false)}
                      autoComplete="off"
                      required
                    />
                    {theme ? (
                      <p
                        id="confirmnote"
                        className={
                          confirmPasswordFocus && !validConfirmPassword
                            ? "instructions-dark"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must Match The First Password Input Field.
                      </p>
                    ) : (
                      <p
                        id="confirmnote"
                        className={
                          confirmPasswordFocus && !validConfirmPassword
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
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
                  {emailExiting ? (
                    <p
                      ref={errRef}
                      className={emailExiting ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {" "}
                      email exiting{" "}
                    </p>
                  ) : null}

                  {errConfirm ? (
                    <p
                      ref={errRef}
                      className={errConfirm ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {" "}
                      Password Doesn't Match{" "}
                    </p>
                  ) : null}

                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </form>
                <br />
              </div>
            </div>
          )}
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
    </>
  );
};

export default Register;
