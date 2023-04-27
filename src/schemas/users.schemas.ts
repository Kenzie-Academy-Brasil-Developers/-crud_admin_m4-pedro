import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().default(false).optional(),
  active: z.boolean().default(true),
});

const requestUserSchema = userSchema.omit({ id: true, active: true });

const updateUserSchema = userSchema
  .omit({
    id: true,
    admin: true,
    active: true,
  })
  .deepPartial();

const responseUserSchema = userSchema.omit({ password: true });

export { userSchema, requestUserSchema, responseUserSchema, updateUserSchema };
