"use client";
import UserPanelLayout from "@/components/Application/Website/UserPanelLayout";
import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb";
import useFetch from "@/hooks/useFetch";
import { WEBSITE_ORDER_DETAILS } from "@/routes/WebsiteRoute";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const breadCrumbData = {
  title: "Dashboard",
  links: [{ label: "Dashboard" }],
};

export default function MyAccountPage() {
  const { data: dashboardData } = useFetch("/api/dashboard/user");
  const cartStore = useSelector((store) => store.cartStore);
  console.log(cartStore);
  console.log(dashboardData);
  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumbData} />
      <UserPanelLayout>
        <div className="shadow rounded">
          <div className="p-5 text-xl font-semibold border">Dashboard</div>
        </div>
        <div className="p-5">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
            <div className="flex items-center justify-between gap-5 border roudned p-3">
              <div>
                <h4 className="font-semibold text-lg mb-1">Total Orders</h4>
                <span className="font-semibold text-gray-500">
                  {dashboardData?.data?.totalOrder || 0}
                </span>
              </div>
              <div className="w-16 h-16 bg-primary rounded-full flex justify-center items-center">
                <HiOutlineShoppingBag className="text-white" size={25} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-5 border roudned p-3">
              <div>
                <h4 className="font-semibold text-lg mb-1">Items In Cart</h4>
                <span className="font-semibold text-gray-500">
                  {cartStore?.count || 0}
                </span>
              </div>
              <div className="w-16 h-16 bg-primary rounded-full flex justify-center items-center">
                <IoCartOutline className="text-white" size={25} />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h4 className="text-lg font-semibold mb-3">Recent Orders</h4>
            <div className="overflow-auto">
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
                  {dashboardData &&
                    dashboardData?.data?.recentOrders?.map((order, i) => (
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
            </div>
          </div>
        </div>
      </UserPanelLayout>
    </div>
  );
}
