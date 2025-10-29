import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CountOverview from "./CountOverview";
import QuickAdd from "./QuickAdd";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OrderOverview } from "./OrderOverview";
import { OrderStatus } from "./OrderStatus";
import LatestOrder from "./LatestOrder";
import LatestReview from "./LatestReview";
import { ADMIN_ORDER_SHOW, ADMIN_REVIEW_SHOW } from "@/routes/AdminPanelRoute";

export default function AdminDashboard() {
  return (
    <div className="pt-5">
      <CountOverview />
      <QuickAdd />
      <div className="mt-10 flex lg:flex-nowrap flex-wrap gap-10">
        <Card className={"rounded-lg lg:w-[70%] w-full p-0"}>
          <CardHeader className={"py-3 border [.border-b]:pb-3"}>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Order Overview</span>
              <Button type="button">
                <Link href={ADMIN_ORDER_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <OrderOverview />
          </CardContent>
        </Card>
        <Card className={"rounded-lg lg:w-[30%] w-full p-0"}>
          <CardHeader className={"py-3 border [.border-b]:pb-3"}>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Orders Status </span>
              <Button type="button">
                <Link href={ADMIN_ORDER_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <OrderStatus />
          </CardContent>
        </Card>
      </div>
      <div className="mt-10 flex lg:flex-nowrap flex-wrap gap-10">
        <Card className={"rounded-lg lg:w-[70%] w-full p-0 block"}>
          <CardHeader className={"py-3 border [.border-b]:pb-3"}>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Latest Order</span>
              <Button type="button">
                <Link href={ADMIN_ORDER_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className={"pt-3 lg:h-[350px] overflow-auto"}>
            <LatestOrder />
          </CardContent>
        </Card>
        <Card className={"rounded-lg lg:w-[30%] w-full p-0"}>
          <CardHeader className={"py-3 border [.border-b]:pb-3"}>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Latest Review</span>
              <Button type="button">
                <Link href={ADMIN_REVIEW_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className={"pt-3 px-1 lg:h-[350px] overflow-auto"}>
            <LatestReview />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
