const { z, boolean } = require("zod");

const credentialsValidator = z.object({
  title: z.string().min(1),
  website: z.string().min(1),
  username: z.string().min(4),
  credential: z.string().min(8),
  favorite: z.boolean().optional(),
});

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
exports.createNotesValidator = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  favorite: z.boolean().optional(),
});

exports.updateNotesValidator = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  favorite: z.boolean().optional(),
});

exports.createCredentialsValidator = credentialsValidator;

exports.updateCredentialsValidator = credentialsValidator.partial();
