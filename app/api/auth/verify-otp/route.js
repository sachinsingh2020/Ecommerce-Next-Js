import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();
    const validatedSchema = zSchema.pick({
      otp: true,
      email: true,
    });

    const validatedData = validatedSchema.safeParse(payload);
    if (!validatedData.success) {
      return response(false, 400, "Invalid Data", validatedData.error);
    }

    const { email, otp } = validatedData.data;

    const getOtpData = await OTPModel.findOne({ email, otp });

    if (!getOtpData) {
      return response(false, 400, "Invalid or expired otp");
    }

    const getUser = await UserModel.findOne({ deletedAt: null, email }).lean();
    if (!getUser) {
      return response(false, 404, "User not found");
    }

    const loggedInUserData = {
      _id: getUser._id.toString(),
      name: getUser.name,
      role: getUser.role,
      avatar: getUser.avatar,
    };

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT(loggedInUserData)
      .setIssuedAt()
      .setExpirationTime("24h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const cookieStore = await cookies();

    cookieStore.set({
      name: "access_token",
      value: token,
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    await getOtpData.deleteOne();

    return response(true, 200, "Login successful", loggedInUserData);
  } catch (error) {
    return catchError(error);
  }
}
