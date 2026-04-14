const { z } = require("zod");
const { passwordSchema } = require("../utils/authUtil");

exports.signUpSchema = z.object({
  username: z.string().min(3),
  password: passwordSchema,
});

exports.logInSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
