const express = require("express");
const router = express.Router();
const UserMiddleware = require("../middleware/userMiddleware");
const CreateController = require("../controllers/userDetails/createUserDetails");
const DeleteMyDetailsController = require("../controllers/userDetails/deleteMyDetails");
const FindMyDetailsController = require("../controllers/userDetails/findMyDetails");
const DeleteAllMyDetailsController = require("../controllers/userDetails/deleteAllMyDetails");
const UpdateAllMyDetailsController = require("../controllers/userDetails/updateUserDetails");


// Create Details Only For Users
router.post(
  "/create",
  UserMiddleware,
  CreateController.createUserDetailsController
);


// Find All My Details Only For Users
router.get("/find/my_details", UserMiddleware, FindMyDetailsController.findMyDetailsController);

// Find Details Only For Users By ID
router.get(
  "/find/:id",
  UserMiddleware,
  FindMyDetailsController.FindDetailsByIdController
);

// Delete Details Only For Users By ID
router.delete(
  "/delete/:id",
  UserMiddleware,
  DeleteMyDetailsController.deleteMyDetailsController
);

// Delete All My Details Only For user 
router.delete("/delete/all_my_details", UserMiddleware, DeleteAllMyDetailsController.deleteAllMyUserDetailsController);

// Update My Details By ID Only For user 
router.put("/update/:id", UserMiddleware, UpdateAllMyDetailsController.updateUserDetailsController)


module.exports = router;
