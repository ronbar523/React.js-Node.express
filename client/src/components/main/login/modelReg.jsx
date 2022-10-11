import React, { useState, useEffect, useRef } from "react";
import { crateNewUser } from "../../../services/usersServices";
import registerSchema from "../../../validation/userValidation/registerValidation";
import joi from "joi-browser";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import ModelLogin from "./modelLog";
import ModelForgetPass from "./modelForgetPass";


// user regex
const USER_NAME_REGEX = /^[A-Za-z\s.\(\)0-9]{2,10}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{6,30}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const ModelRegister = ({ modelReg, setModelReg }) => {
  const modalStyle = {
    display: "block",
  };


  const [modelLogin, setModelLogin] = useState(false);
  const [modelRest, setModelRest] = useState(false);


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

  const errRef = useRef();

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
      {!modelLogin && !modelRest ? (
        <div
          className="modal show fade model-info "
          style={modalStyle}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content location">
              <div className="modal-header">
                {success ? (
                  <h5 className="modal-title fs-2">
                    <b> Success </b>
                  </h5>
                ) : (
                  <h5 className="modal-title fs-2">
                    <b> Register </b>
                  </h5>
                )}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setModelReg(false)}
                ></button>
              </div>
              {success ? (
                <section className="my-4">
                  <h5 className="text-center mt-5 fs-1 ps-2">
                    Success!, Please Check Your Email For Confirm Your Account
                  </h5>
                  <div className="modal-footer footer-success">
                    <button className="btn btn-primary btn-success-reg">
                      Login
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setModelLogin(false);
                        setModelReg(false);
                        setSuccess(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </section>
              ) : modelReg ? (
                <form onSubmit={handleOnSubmit}>
                  <div className="mb-1">
                    <label htmlFor="userName" className="label-model-reg">
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
                          ? "form-control green-input inp-model-reg"
                          : "form-control red-input inp-model-reg"
                      }
                      id="userName"
                      onChange={handleNameChange}
                      aria-invalid={validUserName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserNameFocus(true)}
                      onBlur={() => setUserNameFocus(false)}
                      autoComplete="off"
                      required
                    />

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
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="label-model-reg-email">
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
                          ? "form-control green-input inp-model-reg"
                          : "form-control red-input inp-model-reg"
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
                  </div>
                  <div className="mb-1">
                    <label htmlFor="password" className="label-model-reg-pass">
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
                          ? "form-control green-input inp-model-reg"
                          : "form-control red-input inp-model-reg"
                      }
                      id="password"
                      aria-describedby="pwdnote"
                      onChange={handlePasswordChange}
                      onFocus={() => setPasswordFocus(true)}
                      onBlur={() => setPasswordFocus(false)}
                      autoComplete="off"
                      required
                    />
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
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="confirm_pwd"
                      className="label-model-reg-con"
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
                          ? "form-control green-input inp-model-reg"
                          : "form-control red-input borderErr inp-model-reg"
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
                    <p
                      id="confirmnote"
                      className={
                        confirmPasswordFocus && !validConfirmPassword
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must Match The First Password Input Field.
                    </p>
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

                  <div className="modal-footer footer-reg">
                    <button className="btn btn-primary">Let's Go</button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setModelLogin(true);
                        setModelReg(true);
                      }}
                    >
                      Already Sign-In?
                    </button>
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      ) : modelLogin && !modelRest ? (
        <ModelLogin
          setModelLogin={setModelLogin}
          setModelReg={setModelReg}
          setModelRest={setModelRest}
        />
      ) : modelRest && !modelLogin ? (
        <ModelForgetPass
          modelRest={modelRest}
          setModelRest={setModelRest}
          setModelReg={setModelReg}
        />
      ) : null}
    </>
  );
};

export default ModelRegister;
