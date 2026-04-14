const { z } = require("zod");
const { passwordSchema } = require("../utils/authUtil");

exports.createCredentialsSchema = z.object({
  title: z.string().min(1),
  username: z.string().min(3),
  password: passwordSchema,
  website: z.url(),
});

exports.updateCredentialsSchema = z.object({
  title: z.string().min(1).optional(),
  username: z.string().min(3).optional(),
  password: passwordSchema.optional(),
  website: z.url().optional(),
});
