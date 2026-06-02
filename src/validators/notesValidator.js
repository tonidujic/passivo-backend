const z = require("zod");

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
