import { isAuthenticated } from "@/lib/authentication";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";

export async function PUT(request) {
  try {
    await connectDB();
    const auth = await isAuthenticated("user");
    if (!auth.isAuth) {
      return response(false, 401, "Unauthorized");
    }

    const userId = auth.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return response(false, 404, "User not found");
    }

    const formData = await request.formData();
    const file = formData.get("file");

    user.name = formData.get("name");
    user.phone = formData.get("phone");
    user.address = formData.get("address");

    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const base64Image = `data:${file.type};base64,${Buffer.from(
        fileBuffer
      ).toString("base64")}`;

      const uploadFile = await cloudinary.uploader.upload(base64Image, {
        upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      });

      //   REMOVE OLD AVATAR
      if (user?.avatar?.public_id) {
        await cloudinary.api.delete_resources([user.avatar.public_id]);
      }

      user.avatar = {
        url: uploadFile.secure_url,
        public_id: uploadFile.public_id,
      };
    }

    await user.save();

    return response(true, 200, "Profile updated successfully.", {
      _id: user._id.toString(),
      role: user.role,
      name: user.name,
      avatar: user.avatar,
    });
  } catch (error) {
    return catchError(error);
  }
}
