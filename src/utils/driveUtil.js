const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const config = require("../config");

exports.r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: config.R2_ACCESS_KEY_ID,
    secretAccessKey: config.R2_SECRET_ACCESS_KEY,
  },
});

exports.upload = multer({
  storage: multer.memoryStorage(),
});
