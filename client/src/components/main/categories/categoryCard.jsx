import React, { useState } from "react";
import { getCurrentUser } from "../../../services/usersServices";
import { Link } from "react-router-dom";
import DeleteCategory from "./deleteCategory"



const CategoryCard = ({ item }) => {

  const user = getCurrentUser();

  const [modelDelete, setModelDelete] = useState(false);

  const theName = item.name

  const name = theName.charAt(0).toUpperCase() + theName.slice(1).toLowerCase();


  return (
    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
      <div className="card p-0 overflow-hidden h-100 shadow">
        <div className="card-body">
          <img src={item.url} alt={item.alt} className="card-img" />
        </div>
        <div className="text-center">
          <h5 className="item-name">{name}</h5>
          <Link to={item.name}>
            <button className="btn btn-primary fs-6 mt-2 mb-4 shop-now">
              {" "}
              Shop Now{" "}
            </button>
          </Link>

          {user && user.isAdmin ? (
            <div>
              <button
                className="btn btn-outline-danger button-card mb-3"
                onClick={() => setModelDelete(true)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/dovoajyj.json"
                  trigger="hover"
                  title="Delete"
                ></lord-icon>
              </button>
              <Link to={`/categories/update/${item._id}`}>
                <button className="btn btn-outline-warning button-card mb-3 ms-2">
                  <lord-icon
                    src="https://cdn.lordicon.com/oclwxpmm.json"
                    trigger="hover"
                    title="Edit"
                  ></lord-icon>
                </button>
              </Link>
            </div>
          ) : null}

          {modelDelete ? (
            <DeleteCategory item={item} setModelDelete={setModelDelete} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
