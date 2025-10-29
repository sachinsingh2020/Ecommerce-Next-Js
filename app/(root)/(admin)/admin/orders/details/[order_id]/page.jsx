"use client";
import Image from "next/image";
import placeholderImg from "@/public/assets/images/img-placeholder.webp";
import Link from "next/link";
import { WEBSTIE_PRODUCT_DETAILS } from "@/routes/WebsiteRoute";
import { use, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { ADMIN_DASHBOARD, ADMIN_ORDER_SHOW } from "@/routes/AdminPanelRoute";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import Select from "@/components/Application/Select";
import { orderStatus } from "@/lib/utils";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { showToast } from "@/lib/showToast";
import axios from "axios";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_ORDER_SHOW, label: "Orders" },
  { href: "", label: "Order Details" },
];

const statusOptions = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Processing",
    value: "processing",
  },
  {
    label: "Shipped",
    value: "shipped",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
  {
    label: "Unverified",
    value: "unverified",
  },
];

export default function AdminOrderDetailPage({ params }) {
  const { order_id } = use(params);
  const [orderData, setOrderData] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const { data, loading } = useFetch(`/api/orders/get/${order_id}`);
  console.log(data);

  useEffect(() => {
    if (data && data.success) {
      setOrderData(data.data);
      setOrderStatus(data?.data?.status);
    }
  }, [data]);

  const handleOrderStatus = async () => {
    setUpdatingStatus(true);
    try {
      const { data: response } = await axios.put("/api/orders/update-status", {
        _id: orderData?._id,
        status: orderStatus,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      showToast("success", response.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <div className=" border">
        {!orderData ? (
          <div className="flex justify-center items-center py-32">
            <h4 className="text-red-500 text-xl font-semibold">
              Order Not Found
            </h4>
          </div>
        ) : (
          <div className="pb-4">
            <div className="py-2 px-5 border-b mb-3">
              <h4 className="text-lg font-bold text-primary">Order Details</h4>
            </div>
            <div className="px-5">
              <div className="mb-5">
                <p>
                  <b>Order Id: </b> {orderData?.order_id}
                </p>
                <p>
                  <b>Transaction Id: </b> {orderData?.payment_id}
                </p>
                <p className="capitalize">
                  <b>Status: </b> {orderData?.status}
                </p>
              </div>
              <table className="w-full border">
                <thead className="border-b bg-gray-50 dark:bg-card md:table-header-group hidden">
                  <tr>
                    <th className="text-start p-3">Product</th>
                    <th className="text-center p-3">Price</th>
                    <th className="text-center p-3">Quantity</th>
                    <th className="text-center p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData &&
                    orderData?.products?.map((product) => (
                      <tr
                        key={product.variantId._id}
                        className="md:table-row block border-b">
                        <td className="md:table-cell p-3">
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
                              <h4 className="text-lg">
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
                          <span className="md:hidden font-medium">
                            Quantity
                          </span>
                          <span>{product.qty}</span>
                        </td>
                        <td className="md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center">
                          <span className="md:hidden font-medium">Total</span>
                          <span>
                            {(
                              product.qty * product.sellingPrice
                            ).toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-10 border mt-10">
                <div className="p-5">
                  <h4 className="text-lg font-semibold mb-5">
                    Shipping Address
                  </h4>
                  <div>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="font-medium py-2">Name</td>
                          <td className="text-end py-2">{orderData?.name}</td>
                        </tr>
                        <tr>
                          <td className="font-medium py-2">Email</td>
                          <td className="text-end py-2">{orderData?.email}</td>
                        </tr>
                        <tr>
                          <td className="font-medium py-2">Phone</td>
                          <td className="text-end py-2">{orderData?.phone}</td>
                        </tr>
                        <tr>
                          <td className="font-medium py-2">Country</td>
                          <td className="text-end py-2">
                            {orderData?.country}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium py-2">State</td>
                          <td className="text-end py-2">{orderData?.state}</td>
                        </tr>
                        <tr>
                          <td className="font-medium py-2">City</td>
                          <td className="text-end py-2">{orderData?.city}</td>
                        </tr>
                        <tr>
                          <td className="font-medium py-2">Pincode</td>
                          <td className="text-end py-2">
                            {orderData?.pincode}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium py-2">Lankmark</td>
                          <td className="text-end py-2">
                            {orderData?.lankmark}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium py-2">Order note</td>
                          <td className="text-end py-2">
                            {orderData?.ordernote || "---"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="p-5 bg-gray-50 dark:bg-card">
                  <h4 className="text-lg font-semibold mb-5">Order Summary</h4>
                  <div>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="font-medium py-2">Subtotal</td>
                          <td className="text-end py-2">
                            {orderData?.subTotal.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium py-2">Discount</td>
                          <td className="text-end py-2">
                            {orderData?.discount.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium py-2">Coupon Discount</td>
                          <td className="text-end py-2">
                            {orderData?.couponDiscountAmount.toLocaleString(
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
                            {orderData?.totalAmount.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr />
                  <div className="pt-3">
                    <h4>Order Status</h4>
                    <Select
                      options={statusOptions}
                      selected={orderStatus}
                      setSelected={(value) => setOrderStatus(value)}
                      placeholder="Select"
                      isMulti={false}
                    />
                    <ButtonLoading
                      type={"button"}
                      loading={updatingStatus}
                      onClick={handleOrderStatus}
                      text="Save Status"
                      className="mt-5 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
