import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import CategoryModel from "@/models/Category.model";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }
    await connectDB();

    const getParams = await params;
    const id = getParams.id;

    const filter = {
      deletedAt: null,
    };

    if (!isValidObjectId(id)) {
      return response(false, 400, "Invalid object id.");
    }

    filter._id = id;

    const getCategory = await CategoryModel.findOne(filter).lean();

    if (!getMedia) {
      return response(false, 404, "Category not found.");
    }

    return response(true, 200, "Category found.", getCategory);
  } catch (error) {
    return catchError(error);
  }
}
