import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import OrderModel from "@/models/Order.model";

export async function GET() {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }
    await connectDB();

    const latestOrder = await OrderModel.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return response(true, 200, "Data Found", latestOrder);
  } catch (error) {
    return catchError(error);
  }
}
