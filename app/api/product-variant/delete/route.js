import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import ProductVariantModel from "@/models/ProductVariant.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or Empty id list");
    }

    const data = await ProductVariantModel.find({ _id: { $in: ids } }).lean();
    if (!data.length) {
      return response(false, 404, "Data Not Found");
    }

    if (!["SD", "RSD"].includes(deleteType)) {
      return response(
        false,
        400,
        "Invalid delete type. Delete type should be SD or RSD for this route"
      );
    }

    if (deleteType === "SD") {
      await ProductVariantModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: new Date().toISOString() } }
      );
    } else {
      await ProductVariantModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: null } }
      );
    }

    return response(
      true,
      200,
      deleteType === "SD" ? "Data moved to trash" : "Data restored from trash"
    );
  } catch (error) {
    return catchError(error);
  }
}
export async function DELETE(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or Empty id list");
    }

    const data = await ProductVariantModel.find({ _id: { $in: ids } }).lean();
    if (!data.length) {
      return response(false, 404, "Data Not Found");
    }

    if (!deleteType === "PD") {
      return response(
        false,
        400,
        "Invalid delete type. Delete type should be PD for this route"
      );
    }

    await ProductVariantModel.deleteMany({ _id: { $in: ids } });

    return response(true, 200, "Data deleted permanently");
  } catch (error) {
    return catchError(error);
  }
}
