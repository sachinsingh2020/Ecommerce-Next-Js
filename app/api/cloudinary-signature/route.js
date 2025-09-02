import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();
    const { paramsToSign } = payload;

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_SECRET_KEY
    );
    return NextResponse.json({
      signature,
    });
  } catch (error) {
    return catchError(error);
  }
}
