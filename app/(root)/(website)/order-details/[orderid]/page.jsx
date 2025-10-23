import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb";
import axios from "axios";
import Image from "next/image";
import placeholderImg from "@/public/assets/images/img-placeholder.webp";
import Link from "next/link";
import { WEBSTIE_PRODUCT_DETAILS } from "@/routes/WebsiteRoute";

export default async function OrderDetailsPage({ params }) {
  const { orderid } = await params;
  const { data: orderData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/get/${orderid}`
  );

  const breadcrumb = {
    title: "Order Details",
    links: [{ label: "Order Details" }],
  };
  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />
      <div className="lg:px-32 px-5 my-20">
        {orderData && !orderData.success ? (
          <div className="flex justify-center items-center py-32">
            <h4 className="text-red-500 text-xl font-semibold">
              Order Not Found
            </h4>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <p>
                <b>Order Id: </b> {orderData?.data?.order_id}
              </p>
              <p>
                <b>Transaction Id: </b> {orderData?.data?.payment_id}
              </p>
              <p className="capitalize">
                <b>Status: </b> {orderData?.data?.status}
              </p>
            </div>
            <table className="w-full border">
              <thead className="border-b bg-gray-50 md:table-header-group hidden">
                <tr>
                  <th className="text-start p-3">Product</th>
                  <th className="text-center p-3">Price</th>
                  <th className="text-center p-3">Quantity</th>
                  <th className="text-center p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderData &&
                  orderData?.data?.products?.map((product) => (
                    <tr
                      key={product.variantId._id}
                      className="md:table-row block border-b">
                      <td className="p-3">
                        <div className="flex items-center gap-5">
                          <Image
                            src={
                              product?.variantId?.media[0]?.secure_url ||
                              placeholderImg.src
                            }
                            width={60}
                            height={60}
                            alt="product"
                            className="rounded"
                          />
                          <div>
                            <h4 className="text-lg line-clamp-1">
                              <Link
                                href={WEBSTIE_PRODUCT_DETAILS(
                                  product?.productId?.slug
                                )}>
                                {product?.productId?.name}
                              </Link>
                              <p>Color: {product?.variantId?.color}</p>
                              <p>Size: {product?.variantId?.color}</p>
                            </h4>
                          </div>
                        </div>
                      </td>
                      <td className="md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center">
                        <span className="md:hidden font-medium">Price</span>
                        <span>
                          {product.sellingPrice.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </span>
                      </td>
                      <td className="md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center">
                        <span className="md:hidden font-medium">Quantity</span>
                        <span>{product.qty}</span>
                      </td>
                      <td className="md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center">
                        <span className="md:hidden font-medium">Total</span>
                        <span>
                          {(product.qty * product.sellingPrice).toLocaleString(
                            "en-IN",
                            { style: "currency", currency: "INR" }
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-10 border mt-10">
              <div className="p-5">
                <h4 className="text-lg font-semibold mb-5">Shipping Address</h4>
                <div>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="font-medium py-2">Name</td>
                        <td className="text-end py-2">
                          {orderData?.data?.name}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Email</td>
                        <td className="text-end py-2">
                          {orderData?.data?.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Phone</td>
                        <td className="text-end py-2">
                          {orderData?.data?.phone}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Country</td>
                        <td className="text-end py-2">
                          {orderData?.data?.country}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">State</td>
                        <td className="text-end py-2">
                          {orderData?.data?.state}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">City</td>
                        <td className="text-end py-2">
                          {orderData?.data?.city}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Pincode</td>
                        <td className="text-end py-2">
                          {orderData?.data?.pincode}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Lankmark</td>
                        <td className="text-end py-2">
                          {orderData?.data?.lankmark}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Order note</td>
                        <td className="text-end py-2">
                          {orderData?.data?.ordernote || "---"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-5 bg-gray-50">
                <h4 className="text-lg font-semibold mb-5">Order Summary</h4>
                <div>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="font-medium py-2">Subtotal</td>
                        <td className="text-end py-2">
                          {orderData?.data?.subTotal.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Discount</td>
                        <td className="text-end py-2">
                          {orderData?.data?.discount.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Coupon Discount</td>
                        <td className="text-end py-2">
                          {orderData?.data?.couponDiscountAmount.toLocaleString(
                            "en-IN",
                            {
                              style: "currency",
                              currency: "INR",
                            }
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Total</td>
                        <td className="text-end py-2">
                          {orderData?.data?.totalAmount.toLocaleString(
                            "en-IN",
                            {
                              style: "currency",
                              currency: "INR",
                            }
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
