const { z } = require("zod");
const { passwordValidator } = require("./authValidator");
const { zhCN } = require("zod/locales");

const credentialsValidator = z.object({
  title: z.string().min(1),
  website: z.string().min(1),
  username: z.string().min(1),
  encryptedCredential: z.string().min(1),
});

exports.createCredentialsValidator = credentialsValidator;

exports.updateCredentialsValidator = credentialsValidator.partial();
