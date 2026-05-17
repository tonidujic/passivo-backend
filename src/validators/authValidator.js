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
  fullName: z.string().min(1),
  email: z.email(),
  salt: z.string().min(1),
  payloadAuthKey: z.string().min(1),
  publicKey: z.string().min(1),
  privateKey: z.string().min(1),
  iv: z.string().min(1),
});
exports.logInInitValidator = z.object({
  email: z.email(),
});

exports.logInValidator = z.object({
  email: z.email(),
  authKey: z.string().min(1),
});
