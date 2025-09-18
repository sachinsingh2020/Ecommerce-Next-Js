import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }
    await connectDB();

    const filter = {
      deletedAt: null,
    };

    const getProduct = await ProductModel.find(filter)
      .select("-media -description")
      .sort({ createdAt: -1 })
      .lean();

    if (!getProduct) {
      return response(false, 404, "Collection Empty");
    }

    return response(true, 200, "Data Found", getProduct);
  } catch (error) {
    return catchError(error);
  }
}
