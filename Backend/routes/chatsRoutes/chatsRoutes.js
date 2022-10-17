const express = require("express");
const { protect } = require("../../middlewares/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
  renameGroup,
} = require("../../controllers/chatsController");

const chatsRouter = express.Router();

chatsRouter.route("/").post(protect, accessChat);
chatsRouter.route("/").get(protect, fetchChats);
chatsRouter.route("/group").post(protect, createGroupChat);
chatsRouter.route("/rename").put(protect, renameGroup);
chatsRouter.route("/groupremove").put(protect, removeFromGroup);
chatsRouter.route("/groupadd").put(protect, addToGroup);

module.exports = chatsRouter;
