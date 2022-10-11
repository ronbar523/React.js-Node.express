import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCartArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { getCurrentUser } from "../../../services/usersServices";
import ModelReg from "../login/modelReg";


const InfoProduct = ({ setModelInfo, item, addToCart, setModelInfoOpen }) => {
  const user = getCurrentUser();

  const [modelReg, setModelReg] = useState(false);

  const modalStyle = {
    display: "block",
  };

  return (
    <>
      <div
        className="modal show fade model-all border"
        style={modalStyle}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content location ">
            <div className="modal-header">
              <h5 className="modal-title fs-2">
                <b> {item.name} </b>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => { setModelInfo(false); setModelInfoOpen(false)}}
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="text-center desc-info fs-2">
                <b> {item.name} </b>
              </h5>
              <h5 className="fs-3 mt-4">{item.description}</h5>
            </div>

            <div className="modal-footer info-footer">
              <button
                type="button"
                className="btn btn-secondary mb-2"
                data-bs-dismiss="modal"
                onClick={() => { setModelInfo(false); setModelInfoOpen(false)}}
              >
                <span className="fs-6">Close</span>
              </button>

              {!user ? (
                <button
                  className="btn btn-primary mb-2"
                  onClick={() => setModelReg(true)}
                >
                  <span className="fs-6">
                    Add To Cart &nbsp;
                    <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                  </span>
                </button>
              ) : item.pieces > 0 && item.cart === true ? (
                <button
                  className="btn btn-danger mb-2"
                  onClick={() => addToCart(item)}
                  disabled={true}
                >
                  In The Cart &nbsp;
                  <FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon>
                </button>
              ) : item.cart === false &&
                item.pieces > 0 &&
                user?._id !== item.createdBy ? (
                <button
                  className="btn btn-primary mb-2"
                  onClick={() => addToCart(item)}
                >
                  <span className="fs-6">
                    Add To Cart &nbsp;
                    <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                  </span>
                </button>
              ) : item.createdBy === user?._id ? (
                <button className="btn btn-danger mb-2" disabled={true}>
                  {" "}
                  It's Your Product
                </button>
              ) : item.pieces === 0 && item.createdBy !== user?._id ? (
                <button className="btn btn-danger mb-2" disabled={true}>
                  Sold Out &nbsp;
                  <FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon>
                </button>
              ) : null}
            </div>
            {modelReg ? (
              <ModelReg setModelReg={setModelReg} modelReg={modelReg} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoProduct;
