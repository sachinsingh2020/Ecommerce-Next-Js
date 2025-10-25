"use client";
import Loading from "@/components/Application/Loading";
import UserPanelLayout from "@/components/Application/Website/UserPanelLayout";
import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb";
import useFetch from "@/hooks/useFetch";
import { WEBSITE_ORDER_DETAILS } from "@/routes/WebsiteRoute";
import Link from "next/link";

const breadCrumbData = {
  title: "Orders",
  links: [{ label: "Orders" }],
};

export default function OrdersPage() {
  const { data: orderData, loading } = useFetch("/api/user-order");
  console.log(orderData);
  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumbData} />
      <UserPanelLayout>
        <div className="shadow rounded">
          <div className="p-5 text-xl font-semibold border-b">Orders</div>
        </div>
        <div className="p-5">
          {loading ? (
            <div className="text-center py-5">Loading...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-start p-2 text-sm border-b text-nowrap text-gray-500">
                    Sr. No.
                  </th>
                  <th className="text-start p-2 text-sm border-b text-nowrap text-gray-500">
                    Order id
                  </th>
                  <th className="text-start p-2 text-sm border-b text-nowrap text-gray-500">
                    Total Item
                  </th>
                  <th className="text-start p-2 text-sm border-b text-nowrap text-gray-500">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderData &&
                  orderData?.data?.map((order, i) => (
                    <tr key={order._id}>
                      <td className="text-start text-sm text-gray-500 p-2 font-bold">
                        {i + 1}
                      </td>
                      <td className="text-start text-sm text-gray-500 p-2 ">
                        <Link
                          className="underline hover:text-blue-500 underline-offset-2"
                          href={WEBSITE_ORDER_DETAILS(order.order_id)}>
                          {order.order_id}
                        </Link>
                      </td>
                      <td className="text-start text-sm text-gray-500 p-2 ">
                        {order.products.length}
                      </td>
                      <td className="text-start text-sm text-gray-500 p-2 ">
                        {order.totalAmount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </UserPanelLayout>
    </div>
  );
}
