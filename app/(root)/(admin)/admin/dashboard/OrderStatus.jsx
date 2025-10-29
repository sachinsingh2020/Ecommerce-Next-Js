"use client";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

export const description = "A donut chart";

// const chartData = [
//   { status: "pending", count: 275, fill: "var(--color-pending)" },
//   { status: "processing", count: 200, fill: "var(--color-processing)" },
//   { status: "shipped", count: 187, fill: "var(--color-shipped)" },
//   { status: "delivered", count: 173, fill: "var(--color-delivered)" },
//   { status: "cancelled", count: 90, fill: "var(--color-cancelled)" },
//   { status: "unverified", count: 90, fill: "var(--color-unverified)" },
// ];

const chartConfig = {
  status: {
    label: "Status",
  },
  pending: {
    label: "Pending",
    color: "#3b82f6",
  },
  processing: {
    label: "Processing",
    color: "#eab308",
  },
  shipped: {
    label: "Shipped",
    color: "#06b6d4",
  },
  delivered: {
    label: "Delivered",
    color: "#22c55e",
  },
  cancelled: {
    label: "Cancelled",
    color: "ef4444",
  },
  unverified: {
    label: "Unverified",
    color: "#f97316",
  },
};

export function OrderStatus() {
  const [chartData, setChartData] = useState([]);
  const [statusCount, setStatusCount] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const { data: orderStatus, loading } = useFetch(
    "/api/dashboard/admin/order-status"
  );

  useEffect(() => {
    if (orderStatus && orderStatus.success) {
      const newOrderStatus = orderStatus.data.map((o) => ({
        status: o._id,
        count: o.count,
        fill: `var(--color-${o._id})`,
      }));

      setChartData(newOrderStatus);

      const getTotalCount = orderStatus.data.reduce(
        (acc, curr) => acc + curr.count,
        0
      );
      setTotalCount(getTotalCount);

      const statusObj = orderStatus.data.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {});

      setStatusCount(statusObj);
    }
  }, [orderStatus]);

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="status"
            innerRadius={60}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle">
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold">
                        {totalCount}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground">
                        Orders
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div>
        <ul>
          <li className="flex justify-between items-center mb-3 text-sm">
            <span>Pending</span>
            <span className="rounded-full px-2 text-sm bg-blue-500 text-white">
              {statusCount?.pending || 0}
            </span>
          </li>
          <li className="flex justify-between items-center mb-3 text-sm">
            <span>Processing</span>
            <span className="rounded-full px-2 text-sm bg-yellow-500 text-white">
              {statusCount?.processing || 0}
            </span>
          </li>
          <li className="flex justify-between items-center mb-3 text-sm">
            <span>Shipped</span>
            <span className="rounded-full px-2 text-sm bg-cyan-500 text-white">
              {statusCount?.shipped || 0}
            </span>
          </li>
          <li className="flex justify-between items-center mb-3 text-sm">
            <span>Delivered</span>
            <span className="rounded-full px-2 text-sm bg-green-500 text-white">
              {statusCount?.delivered || 0}
            </span>
          </li>
          <li className="flex justify-between items-center mb-3 text-sm">
            <span>Cancelled</span>
            <span className="rounded-full px-2 text-sm bg-red-500 text-white">
              {statusCount?.cancelled || 0}
            </span>
          </li>
          <li className="flex justify-between items-center mb-3 text-sm">
            <span>Unverified</span>
            <span className="rounded-full px-2 text-sm bg-orange-500 text-white">
              {statusCount?.unverified || 0}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
