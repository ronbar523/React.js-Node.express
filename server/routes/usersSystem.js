const express = require("express");
const router = express.Router();
const AdminMiddleware = require('../middleware/adminMiddleware');
const UserMiddleware = require('../middleware/userMiddleware');
const RegisterController = require("../controllers/users/registerUser");
const VerifyControllers = require("../controllers/users/verifyUser");
const LoginController = require("../controllers/users/loginUser");
const ResetPasswordController = require("../controllers/users/resetPasswordUser");
const DeleteController = require("../controllers/users/deleteUser");
const FindController = require("../controllers/users/findUser");
const BlockController = require("../controllers/users/blockUser");
const ChangePasswordController = require("../controllers/users/updatePasswordUser");
const DeleteUserController = require("../controllers/users/deleteMyUser");
const BecomeBizUserController = require("../controllers/users/becomeBizUser");
const BecomePremiumUserController = require("../controllers/users/becomePremiumUser");
const ChangeEmailController = require("../controllers/users/changeEmailUser");


// Register Request
router.post("/register", RegisterController.registerUserController);

// Verify Request
router.patch("/verify", VerifyControllers.verifyUserController);

// Login Request
router.post('/login', LoginController.loginUserController);


// Reset Password Request
router.post("/reset_password", ResetPasswordController.restUserPasswordController);

// Replace The Password After The Reset => Change Password Request
router.patch("/reset_password/:email/:num", ResetPasswordController.changeUserPasswordController);


// Change Password Request
router.patch("/change_password", UserMiddleware, ChangePasswordController.changeUserPasswordController);


// Change Email Request
router.patch("/change_email", UserMiddleware, ChangeEmailController.changeUserEmailController
);

// Delete User Request Only For Admin Request
router.delete("/delete_user_by_admin/:id", AdminMiddleware, DeleteController.deleteUserController);

// Delete My User Request
router.delete(
  "/delete_my_user",
  UserMiddleware, DeleteUserController.deleteMyUserController
);

// Find All User Request Only For Admin Request
router.get("/find_all_users",  FindController.findAllUsersController);

// Find User By Email Request
router.get("/find_by_email", FindController.findUserByEmail);

// Find User By UserName Request Only For Admin Request
router.get("/find_by_user_name", FindController.findUserNameController);

// Find All User Verify Or Not Verify => Request Only For Admin Request
router.get("/find_all_verify_user", AdminMiddleware, FindController.findOnlyUsersVerifyController);

// Find All User blocked Or Not blocked => Request Only For Admin Request
router.get("/find_all_block_user", AdminMiddleware, FindController.findOnlyUsersBlockController);

// Block User Request Only For Admin Request
router.patch("/block_user_by_admin/:id", AdminMiddleware, BlockController.blockUserController);

// Change Biz Status
router.patch(
  "/become_biz",
  UserMiddleware,
  BecomeBizUserController.becomeBizUserController
);

// Change Biz premium
router.patch(
  "/become_premium",
  UserMiddleware,
  BecomePremiumUserController.becomePremiumUserController
);

module.exports = router;