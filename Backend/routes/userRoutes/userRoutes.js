const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../../controllers/userController");
const { protect } = require("../../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.route("/").post(registerUser).get(protect, allUsers);
userRouter.route("/login").post(authUser);

module.exports = userRouter;
