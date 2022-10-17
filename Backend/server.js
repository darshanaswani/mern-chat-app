const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const { chats } = require("./Data/data");
const { Server } = require("socket.io");
const userRouter = require("./routes/userRoutes/userRoutes");
const chatsRouter = require("./routes/chatsRoutes/chatsRoutes");
const messageRouter = require("./routes/messageRoutes/messageRoutes");
const dotenv = require("dotenv");
const colors = require("colors");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/chat", chatsRouter);
app.use("/api/message", messageRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;

  io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });

    socket.on("join room", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });

    socket.on("new message", (newMessageReceived) => {
      let chat = newMessageReceived.chat;
      if (!chat.users) console.log("no users exist");

      chat.users.forEach((user) => {
        if (user._id === newMessageReceived.sender._id) {
          return;
        }
        socket.in(user._id).emit("message recieved", newMessageReceived);
      });
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });

  server.listen(PORT, () => {
    console.log("Server started on port 5000".bgGreen);
  });
};

startServer();
