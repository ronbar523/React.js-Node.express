import React, { useState, useEffect, useRef } from "react";
import { loginUser, findUserByEmail } from "../../../services/usersServices";
import joi from "joi-browser";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import loginSchema from "../../../validation/userValidation/loginValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

// user regex
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{6,30}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const ModelLogin = ({
  setModelReg,
  setModelLogin,
  setModelRest,
}) => {
  const modalStyle = {
    display: "block",
  };

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

  const errRef = useRef();

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
        setModelReg(false);
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
      <div
        className="modal show fade model-info "
        style={modalStyle}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content location">
            <div className="modal-header">
              <h5 className="modal-title fs-2">
                <b> Login </b>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setModelReg(false)}
              ></button>
            </div>
            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="label-model-reg-email-login">
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
                  autoComplete="false"
                  className={
                    validEmail
                      ? "form-control green-input inp-model-reg input-email-login"
                      : "form-control red-input inp-model-reg input-email-login"
                  }
                  id="email"
                  onChange={handleEmailChange}
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  defaultValue=""
                  required
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instructions msg-email-login"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  You Need An Email To Continue
                </p>
              </div>
              <div className="mb-1">
                <label
                  htmlFor="password"
                  className="label-model-reg-pass-login"
                >
                  Password:
                  <span className={validPassword ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validPassword || !password ? "hide" : "invalid "}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  className={
                    validPassword
                      ? "form-control green-input input-password-login"
                      : "form-control red-input input-password-login"
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
                      ? "instructions msg-pass-login"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  You Need 6 To 30 Characters. <br />
                  Must Include At least 1 big Letter, 1 small letter, 1 number
                  and 1 sign.
                </p>
              </div>

              <p
                ref={errRef}
                className={errMsg ? "errmsgModel" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>

              {verify ? (
                <p
                  ref={errRef}
                  className={verify ? "errmsgModel" : "offscreen"}
                  aria-live="assertive"
                >
                  "You need to verify your account"
                </p>
              ) : null}

              {block ? (
                <p
                  ref={errRef}
                  className={block ? "errmsgModel" : "offscreen"}
                  aria-live="assertive"
                >
                  "Your account it's block"
                </p>
              ) : null}

              {wrongPassword ? (
                <p
                  ref={errRef}
                  className={wrongPassword ? "errmsgModel" : "offscreen"}
                  aria-live="assertive"
                >
                  "The Password it's wrong"
                </p>
              ) : null}

              {emailNotExist ? (
                <p
                  ref={errRef}
                  className={emailNotExist ? "errmsgModel" : "offscreen"}
                  aria-live="assertive"
                >
                  "The email not exist"
                </p>
              ) : null}

              <div className="modal-footer footer-login">
                <button type="submit" className="btn btn-primary">
                  Let's Go
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setModelLogin(false);
                    setModelRest(true);
                  }}
                >
                  Forget Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelLogin;
