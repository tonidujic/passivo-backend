const { z } = require("zod");

const passwordValidator = z
  .string()
  .min(8)
  .regex(/[1-9]/)
  .regex(/[A-Z]/)
  .regex(/[a-z]/)
  .regex(/[^A-Za-z0-9]/);

exports.passwordValidator = passwordValidator;
exports.signUpValidator = z.object({
  username: z.string().min(3),
  password: passwordValidator,
});

exports.logInValidator = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
