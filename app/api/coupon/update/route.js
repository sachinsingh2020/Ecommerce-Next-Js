import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import CouponModel from "@/models/Coupon.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }
    await connectDB();

    const payload = await request.json();

    const schema = zSchema.pick({
      _id: true,
      code: true,
      discountPercentage: true,
      minShoppingAmount: true,
      validity: true,
    });

    const validate = schema.safeParse(payload);

    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields", validate.error);
    }

    const validatedData = validate.data;

    const getCoupon = await CouponModel.findOne({
      deleteAt: null,
      _id: validatedData._id,
    });
    if (!getCoupon) {
      return response(false, 404, "Data not found");
    }

    getCoupon.code = validatedData.code;
    getCoupon.discountPercentage = validatedData.discountPercentage;
    getCoupon.minShoppingAmount = validatedData.minShoppingAmount;
    getCoupon.validity = validatedData.validity;

    await getCoupon.save();

    return response(true, 200, "Coupon updated successfully");
  } catch (error) {
    return catchError(error);
  }
}
