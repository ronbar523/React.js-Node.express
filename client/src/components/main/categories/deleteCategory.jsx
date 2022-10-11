import React from "react";
import { toast } from "react-toastify";
import { deleteCategoryById } from "../../../services/categoriesServices";

const ModelDelete = ({ item, setModelDelete }) => {
  const modalStyle = {
    display: "block",
  };



  const handleDelete = async () => {
    try {
      const res = await deleteCategoryById(item._id);

      setTimeout(() => {
        if (res.data.msg === "Category Deleted Successfully") {
          setModelDelete(false);
          toast.success(`The Category It's Deleted`);
          window.location = "/categories";
        } else {
          toast.error(`Something happened`);
        }
      }, 1000);
    } catch (err) {
      console.log(err);
    } 
}


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
              <b> {item.name} </b>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setModelDelete(false)}
            ></button>
          </div>
          <div className="modal-body">
            <br></br>
            <p className="fs-4">
              Are you sure that you want to delete
              <span className="text-danger">
                <b>&nbsp;{item.name}</b>
              </span>
              ?
            </p>
            <br></br>
          </div>

          <div className="modal-footer">
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
              onClick={() => setModelDelete(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDelete;
