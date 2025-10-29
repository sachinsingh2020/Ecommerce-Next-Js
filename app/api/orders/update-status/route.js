import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import OrderModel from "@/models/Order.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }
    await connectDB();

    const { _id, status } = await request.json();

    if (!_id || !status) {
      return response(false, 404, "Order ID and status are required");
    }

    const orderData = await OrderModel.findById(_id);

    if (!orderData) {
      return response(false, 404, "Order not found");
    }

    orderData.status = status;
    await orderData.save();

    return response(true, 200, "Order status updated successfully", orderData);
  } catch (error) {
    return catchError(error);
  }
}
