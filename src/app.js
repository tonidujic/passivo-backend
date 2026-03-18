const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const config = require("./config");

const express = require("express");
const cookieParser = require("cookie-parser");

const infoRouter = require("./routes/infoRouter.js");
const authRouter = require("./routes/authRouter.js");
const passwordRouter = require("./routes/passwordRouter");
const { connectDB } = require("./db/index.js");

const app = express();

const PORT = config.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/", infoRouter);
app.use("/api/auth", authRouter);
app.use("/api/password", passwordRouter);

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    message: err.message,
  });
});

async function startServer() {
  await connectDB();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();
