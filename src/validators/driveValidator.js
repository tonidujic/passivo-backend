const { z } = require("zod");

exports.uploadFileValidator = z.object({
  originalname: z.string().min(1),
  mimetype: z.string().min(1),
  size: z.number().positive(),
  buffer: z.instanceof(Buffer),
});

exports.renameFileValidator = z.object({
  fileName: z.string().min(1),
});
