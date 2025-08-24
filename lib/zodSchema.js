import { z } from "zod";

export const zSchema = z.object({
  email: z.email({ message: "Enter a valid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(72, { message: "Password must be at most 72 characters" })
    .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
    .regex(/\d/, { message: "Must include at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Must include at least one special character",
    })
    .refine((val) => !/\s/.test(val), { message: "No spaces allowed" }),
});
