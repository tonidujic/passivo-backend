const { z } = require("zod");

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
  remember: z.boolean().optional().default(false),
});

exports.changePasswordValidator = z.object({
  currentAuthKey: z.string().min(1),
  newAuthKey: z.string().min(1),
  salt: z.string().min(1),
  privateKey: z.string().min(1),
  iv: z.string().min(1),
});
