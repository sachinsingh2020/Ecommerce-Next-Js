import { z } from "zod";

export const zSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(50, { message: "Full name must be at most 50 characters" }),

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

  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),

  _id: z.string().min(3, "_id is required"),
  alt: z.string().min(3, "Alt is required"),
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "slug is required"),

  category: z.string().min(3, "Category is required"),
  mrp: z.union([
    z.number().positive("Expected positive value, received negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),
  sellingPrice: z.union([
    z.number().positive("Expected positive value, received negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),
  discountPercentage: z.union([
    z.number().positive("Expected positive value, received negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),

  description: z.string().min(3, "Description is required"),
  media: z.array(z.string()),
  product: z.string().min(3, "Product is Required"),
  color: z.string().min(3, "Color is required"),
  size: z.string().min(1, "Size is required"),
  sku: z.string().min(3, "SKU is required"),
  code: z.string().min(3, "Code is required"),
  minShoppingAmount: z.union([
    z.number().positive("Expected positive value, received negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),
  validity: z.coerce.date(),
  userId: z.string().min(3, "User Id is Required"),
  rating: z.union([
    z.number().positive("Expected positive value, received negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),
  review: z.string().min(3, "Review is Required"),
});
