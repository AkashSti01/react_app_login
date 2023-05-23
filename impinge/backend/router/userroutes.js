const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const verifyToken = require("../middleware/verifyToken");

// Router to get register users.
router.get("/user", userController.getUser);
// Router for register new users.
router.post("/register", userController.Register);
// Router for register new users.
router.post("/login", verifyToken, userController.userLoginController);

// Router for user logout functionality.
router.delete("/logout", userController.Logout);

module.exports = router;
