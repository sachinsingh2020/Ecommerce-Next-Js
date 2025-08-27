import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";

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

    await getOtpData.deleteOne();

    return response(true, 200, "Otp Verified");
  } catch (error) {
    return catchError(error);
  }
}
