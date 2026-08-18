const { z } = require("zod");

exports.uploadFileValidator = z.object({
  fileName: z.string().min(1),
  file: z.string().min(1),
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
