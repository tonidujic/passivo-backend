const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const infoRouter = require("./routes/infoRouter.js");
const authRouter = require("./routes/authRouter.js");
const { connectDB } = require("./db/mongo.js");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use("/", infoRouter);
app.use("/auth", authRouter);

async function startServer() {
  await connectDB();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();
