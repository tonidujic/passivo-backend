const { z } = require("zod");

const credentialsValidator = z.object({
  title: z.string().min(1),
  website: z.string().min(1),
  username: z.string().min(1),
  credential: z.string().min(1),
});

exports.createCredentialsValidator = credentialsValidator;

exports.updateCredentialsValidator = credentialsValidator.partial();
