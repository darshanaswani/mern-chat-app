const express = require("express");
const { protect } = require("../../middlewares/authMiddleware");
const {
  allMessages,
  sendMessage,
} = require("../../controllers/messagesController");
const messageRouter = express.Router();

messageRouter.route("/").post(protect, sendMessage);
messageRouter.route("/:chatId").get(protect, allMessages);

module.exports = messageRouter;
