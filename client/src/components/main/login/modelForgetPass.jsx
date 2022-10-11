import React, { useState, useEffect, useRef } from "react";
import {
  findUserByEmail,
  restPassword,
} from "../../../services/usersServices";
import joi from "joi-browser";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import forgetPassSchema from "../../../validation/userValidation/forgetPassValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";


// user regex

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const ModelForgetPass = ({ setModelReg, modelRest, setModelRest }) => {
  const modalStyle = {
    display: "block",
  };

  const [modelRestSuccess, setModelRestSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  

 
  const [emailNotExist, setEmailNotExist] = useState(false);

  const errRef = useRef();

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [ email, ]);

  
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
          toast.success(`We sent you email with a like`);
          setModelRestSuccess(true);
        //   setModelRest(false);
        }
      }
    } catch (err) {
      console.log(err);
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
              {!modelRestSuccess ? (
                <h5 className="modal-title fs-2">
                  <b> Rest Password </b>
                </h5>
              ) : (
                <h5 className="modal-title fs-2">
                  <b> Success </b>
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
            {modelRestSuccess ? (
              <section className="my-4">
                <h5 className="text-center mt-5 fs-1 ps-2">
                  You Received A Mail With Link To Change Your Password
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
                      setModelReg(false);
                      setModelRest(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </section>
            ) :  modelRest ? (
              <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="label-model-reg-email-rest">
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
                        ? "form-control green-input inp-model-rest "
                        : "form-control red-input inp-model-rest "
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
                        ? "instructions msg-email-rest"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    You Need An Email To Continue
                  </p>
                </div>
                {emailNotExist ? (
                  <p
                    ref={errRef}
                    className={emailNotExist ? "errmsgModelForget" : "offscreen"}
                    aria-live="assertive"
                  >
                    "The email not exist"
                  </p>
                ) : null}

                <div className="modal-footer footer-rest">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setModelReg(false);
                      setModelRest(true);
                    }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Rest Password
                  </button>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelForgetPass;
