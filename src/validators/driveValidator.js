const { z } = require("zod");

exports.uploadFileValidator = z.object({
  fileName: z.string().min(1),
  // A 10 MiB encrypted file is about 14 MiB after Base64 encoding. Keeping
  // the payload below this limit also keeps the MongoDB document under 16 MiB.
  file: z.string().min(1).max(14_100_000, "File is too large (maximum 10 MB)"),
  fileType: z.string().min(1),
  title: z.string().min(1),
  favorite: z.boolean().optional(),
  iv: z.string().min(1),
  key: z.string().min(1),
});

exports.renameFileValidator = z.object({
  fileName: z.string().min(1).optional(),
  favorite: z.boolean().optional(),
});
