import React, { useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

import { deleteMyUser, logout } from "../../services/usersServices";

const DeleteMyUser = ({user, theme}) => {

  

  const [modelDelete, setModelDelete] = useState(true);

  const modalStyle = {
    display: "block",
  };

  const handleDelete = async () => {
    try {
      await deleteMyUser(user.email);
      setModelDelete(false);
      toast.success(`Your user is deleted`);
      setTimeout(() => {
        logout();
        window.location = "/";
      }, 1000);
    } catch (err) {
      toast.error(`Something happened`);
    }
  };

  return (
    <>
      {modelDelete ? (
        <div
        
          className={
            theme
              ? "modal show fade model-all border theme-dark"
              : "modal show fade model-all border"
          }
          style={modalStyle}
          tabIndex="-1"
        >
          <div className="modal-dialog model-border">
            <div className="modal-content location ">
              <div className="modal-header">
                <h5 className="modal-title fs-4">
                  <b> Delete Your User </b>
                </h5>
                <NavLink className="cancel-delete" to="/">
                  <button
                    type="button"
                    className="btn btn-secondary cancel-delete-button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    X
                  </button>
                </NavLink>
              </div>
              <div className="modal-body">
                <br></br>
                <p className="fs-4 text-center msg-delete-all">
                  Are you sure you want to delete your User?
                </p>
                <br></br>
              </div>

              <div className="modal-footer footer-delete-all">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <NavLink className="cancel-delete" to="/">
                <button
                  type="button"
                  className="btn btn-secondary mb-3"
                  data-bs-dismiss="modal"
                >
                    Cancel
                </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeleteMyUser;
