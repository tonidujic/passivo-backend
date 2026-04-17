const { z } = require("zod");
const { passwordValidator } = require("./authValidator");

const credentialsValidator = z.object({
  title: z.string().min(1),
  username: z.string().min(3),
  password: passwordValidator,
  website: z.url(),
});

exports.createCredentialsValidator = credentialsValidator;

exports.updateCredentialsValidator = credentialsValidator.partial();
