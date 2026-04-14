const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const config = require("./config");

const express = require("express");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRouter.js");
const passwordRouter = require("./routes/credentialsRouter.js");
const driveRouter = require("./routes/driveRouter");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController.js");
const { connectDB } = require("./db/index.js");

const app = express();

const PORT = config.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/password", passwordRouter);
app.use("/api/drive", driveRouter);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

startServer();
