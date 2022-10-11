import React from "react";
import { toast } from "react-toastify";
import { deleteAllMyProducts } from "../../../services/productServices";

const DeleteAllMyProducts = ({ setModelDeleteAll }) => {
  const modalStyle = {
    display: "block",
  };

 

  const handleDelete = async () => {
    try {
      await deleteAllMyProducts();     
      setModelDeleteAll(false);
      toast.success(`All Yours Product It's Deleted`);
      window.location = `/my_products`;
    } catch (err) {
      toast.error(`Something happened`);
    }
  };

  return (
    <div
      className="modal show fade model-all border"
      style={modalStyle}
      tabIndex="-1"
    >
      <div className="modal-dialog model-border">
        <div className="modal-content location ">
          <div className="modal-header">
            <h5 className="modal-title fs-4">
              <b> Delete Your Products </b>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setModelDeleteAll(false)}
            ></button>
          </div>
          <div className="modal-body">
            <br></br>
            <p className="fs-4 text-center msg-delete-all">
              Are you sure that you want to delete
              <span className="text-danger">
                <b>&nbsp;all your products</b>
              </span>
              ?
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
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setModelDeleteAll(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAllMyProducts;
