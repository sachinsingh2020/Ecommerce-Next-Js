import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { jwtVerify } from "jose";

export async function POST(request) {
  try {
    await connectDB();
    const { token } = await request.json();

    if (!token) {
      return response(false, 400, "Missing Token");
    }

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const decoded = await jwtVerify(token, secret);

    const userId = decoded.payload.userId;

    // get user
    const user = await UserModel.findById(userId);
    if (!user) {
      return response(false, 400, "User not found");
    }

    user.isEmailVerified = true;
    await user.save();

    return response(true, 200, "Email verified successfully");
  } catch (error) {
    return catchError(error);
  }
}
