import { orderNotification } from "@/email/orderNotification";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OrderModel from "@/models/Order.model";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import z from "zod";

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();
    console.log(payload.products);

    const productSchema = z.object({
      productId: z.string().length(24, "Invalid product id format"),
      variantId: z.string().length(24, "Invalid variant id format"),
      name: z.string().min(1),
      qty: z.number().min(1),
      mrp: z.number().nonnegative(),
      sellingPrice: z.number().nonnegative(),
    });

    const orderSchema = zSchema
      .pick({
        name: true,
        email: true,
        phone: true,
        country: true,
        state: true,
        city: true,
        pincode: true,
        landmark: true,
        ordernote: true,
      })
      .extend({
        userId: z.string().optional(),
        razorpay_payment_id: z.string().min(3, "Payment Id is required"),
        razorpay_order_id: z.string().min(3, "Order Id is required"),
        razorpay_signature: z.string().min(3, "Signature  is required"),
        subTotal: z.number().nonnegative(),
        discount: z.number().nonnegative(),
        couponDiscountAmount: z.number().nonnegative(),
        totalAmount: z.number().nonnegative(),
        products: z.array(productSchema),
      });

    const validate = orderSchema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields", {
        error: validate.error,
      });
    }

    const validatedData = validate.data;

    // payment verification
    const verification = validatePaymentVerification(
      {
        order_id: validatedData.razorpay_order_id,
        payment_id: validatedData.razorpay_payment_id,
      },
      validatedData.razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET
    );

    let paymentVerification = false;
    if (verification) {
      paymentVerification = true;
    }

    const newOrder = await OrderModel.create({
      user: validatedData.userId,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      country: validatedData.country,
      state: validatedData.state,
      city: validatedData.city,
      pincode: validatedData.pincode,
      landmark: validatedData.landmark,
      ordernote: validatedData.ordernote,
      products: validatedData.products,
      subTotal: validatedData.subTotal,
      discount: validatedData.discount,
      couponDiscountAmount: validatedData.couponDiscountAmount,
      totalAmount: validatedData.totalAmount,
      payment_id: validatedData.razorpay_payment_id,
      order_id: validatedData.razorpay_order_id,
      status: paymentVerification ? "pending" : "unverified",
    });

    try {
      const mailData = {
        order_id: validatedData.razorpay_order_id,
        orderDetailsUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/order-details/${validatedData.razorpay_order_id}`,
      };

      console.log("validatedData email: ", validatedData.email);

      await sendMail(
        "Order placed successfully",
        validatedData.email,
        orderNotification(mailData)
      );
    } catch (error) {
      console.log(error);
    }

    console.log({ newOrder });

    return response(true, 200, "Order placed successfully.", newOrder);
  } catch (error) {
    return catchError(error);
  }
}
