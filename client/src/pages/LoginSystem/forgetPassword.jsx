import React, { useState, useEffect, useRef } from "react";
import {
  findUserByEmail,
  getCurrentUser,
  restPassword,
} from "../../services/usersServices";
import forgetPassSchema from "../../validation/userValidation/forgetPassValidation";
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

  const [emailNotExist, setEmailNotExist] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };

  const handleOnSubmit = async (ev) => {
    if (ev) {
      ev.preventDefault();
    }

    const user = {
      email: email,
    };

    const theUserFound = await findUserByEmail(user.email);

    try {
      const validatedValue = joi.validate({ email }, forgetPassSchema, {
        abortEarly: false,
      });

      const { error } = validatedValue;

      if (!error) {
        if (theUserFound.data[0] === undefined) {
          setEmailNotExist(true);
          setValidEmail(false);
        } else {
          await restPassword(user);
          setSuccess(true);
          toast.success(`We sent you email with a like`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {user && <Navigate to="/" />}
      <div className={theme ? "theme-dark long" : "long"}>
        <div className="main container">
          {success ? (
            <section className="register-success">
              <h1 className="text-center">
                You Received A Mail With Link To Change Your Password
              </h1>
            </section>
          ) : (
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <form onSubmit={handleOnSubmit}>
                  <br />
                  <div className="fadeIn first">
                    <h1 className="text-center title-shop">Reset Password</h1>
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
                  {emailNotExist ? (
                    <p
                      ref={errRef}
                      className={emailNotExist ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      "The email doesn't exist"
                    </p>
                  ) : null}

                  <button type="submit" className="btn btn-primary">
                    Reset Password
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
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
