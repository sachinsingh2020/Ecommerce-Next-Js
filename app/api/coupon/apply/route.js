import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import CouponModel from "@/models/Coupon.model";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();

    const couponFormSchema = zSchema.pick({
      code: true,
      minShoppingAmount: true,
    });

    const validate = couponFormSchema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Missing or invalid data.", validate.error);
    }

    const { code, minShoppingAmount } = validate.data;

    const couponData = await CouponModel.findOne({ code }).lean();
    if (!couponData) {
      return response(
        false,
        400,
        "Invalid or expired coupon code.",
        validate.error
      );
    }

    if (new Date() > couponData.validity) {
      return response(false, 400, "Coupon Code Expired.", validate.error);
    }

    if (minShoppingAmount < couponData.minShoppingAmount) {
      return response(false, 400, "In-sufficient shopping amount.");
    }

    return response(true, 200, "Coupon applied successfully", {
      discountPercentage: couponData.discountPercentage,
    });
  } catch (error) {
    return catchError(error);
  }
}
