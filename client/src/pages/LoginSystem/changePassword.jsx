import React, { useState, useEffect, useRef } from "react";
import {
  changePassword,
  findUserByEmail,
  getCurrentUser,
} from "../../services/usersServices";
import changePasswordSchema from "../../validation/userValidation/changePassValidation";
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
import { motion } from "framer-motion";


const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{6,30}$/;


const ChangePassword = ({ theme, setTheme }) => {
  const user = getCurrentUser();

  // Side Navbar
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const [show, setShow] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const [expired, setExpired] = useState(false);
  const [wrongConfirm, setWrongConfirm] = useState(false);

  const url = window.location.href;
  const urlWordsArr = url.split("/");

  const passwordRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);

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

    const email = urlWordsArr[4];
    const num = urlWordsArr[5];

    const user = {
      password: password,
    };

    const theUserFound = await findUserByEmail(email);

    try {
      const validatedValue = joi.validate({ password }, changePasswordSchema, {
        abortEarly: false,
      });

      const { error } = validatedValue;

      if (!error) {
        if (password !== confirmPassword) {
          setWrongConfirm(true);
        } else if (theUserFound.data[0].randomSecureNumber === undefined) {
          setExpired(true);
          setWrongConfirm(false);
        } else if (theUserFound.data[0].randomSecureNumber === num) {
          await changePassword(email, num, user);
          toast.success(
            `${theUserFound.data[0].userName} your password changed`
          );
          window.location = "/";
        } else {
          setExpired(true);
          setWrongConfirm(false);
        }
      }
    } catch (err) {}
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
                  <h1 className="text-center title-shop">Change Password</h1>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label label-dark">
                    Password
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
                    ref={passwordRef}
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
                      Must match the first password input field.
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
                {wrongConfirm ? (
                  <p
                    ref={errRef}
                    className={wrongConfirm ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {" "}
                    Password Doesn't Match
                  </p>
                ) : null}

                {expired ? (
                  <p
                    ref={errRef}
                    className={expired ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {" "}
                    The Link Is Expired
                  </p>
                ) : null}

                <button type="submit" className="btn btn-primary">
                  Change Password
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

export default ChangePassword;
