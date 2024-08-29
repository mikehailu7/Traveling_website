
const helmet = require("helmet");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const imageRouter = require("./routes/image_route");
const http = require("http");
const socket = require("socket.io");
const { isDev } = require('./utils/environment');




const AppError = require("./utils/appError");
const globalErrorHandler = require("./middlewares/error");

const authRouter = require("./routes/authenticationroute");
const houseRouter = require("./routes/place_route");
const reviewRouter = require("./routes/reviewRoute");

const express = require("express");
const monogoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const userRouter = require("./routes/customerRoute");


const app = express();

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    allowed: "*",
  },
});

app.use(cors());

app.use(cookieParser());

app.use(express.json({ limit: "10kb" }));

app.use(monogoSanitize());

app.use(xssClean());

app.use(hpp());

app.use(helmet());

app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/authentication", authenticationrouter);
app.use("/api/v1/place", placerouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/image", imageRouter);

app.use("*", (req, res, next) => {
  next(
    new AppError(`The requested url ${req.originalUrl} does not exist`, 404)
  );
});

app.use(globalErrorHandler);

io.on("connection", (socket) => {
  socket.on("join", (ids) => {
    console.log(ids);
    socket.join(ids);
    socket.on("notify-item-added", (data) => {
      socket.broadcast.to(data.id).emit("receive-item-added", data.content);
    });
  });
});

module.exports = server;
