const { z, boolean } = require("zod");

const credentialsValidator = z.object({
  title: z.string().min(1),
  website: z.string().min(1),
  username: z.string().min(1),
  credential: z.string().min(1),
  favorite: z.boolean().optional(),
});

exports.createCredentialsValidator = credentialsValidator;

exports.updateCredentialsValidator = credentialsValidator.partial();
