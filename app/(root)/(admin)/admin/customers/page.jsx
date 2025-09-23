"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import DataTableWrapper from "@/components/Application/Admin/DataTableWrapper";
import DeleteAction from "@/components/Application/Admin/DeleteAction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DT_CUSTOMER_COLUMN } from "@/lib/column";
import { columnConfig } from "@/lib/helperFunction";
import { ADMIN_DASHBOARD, ADMIN_TRASH } from "@/routes/AdminPanelRoute";
import { useCallback, useMemo } from "react";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: "", label: "Customers" },
];
export default function ShowCustomers() {
  const columns = useMemo(() => {
    return columnConfig(DT_CUSTOMER_COLUMN);
  }, []);

  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = [];
    actionMenu.push(
      <DeleteAction
        key={"delete"}
        handleDelete={handleDelete}
        row={row}
        deleteType={deleteType}
      />
    );
    return actionMenu;
  }, []);

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className={"py-0 rounded shadow-sm gap-0"}>
        <CardHeader className={"pt-3 px-3 border-b [.border-b]:pb-2"}>
          <div className="flex justify-between items-center">
            <h4 className="text-xl text-semibold">Customers</h4>
          </div>
        </CardHeader>
        <CardContent className={" px-0 pt-0"}>
          <DataTableWrapper
            queryKey={"customers-data"}
            fetchUrl={"/api/customers"}
            initialPageSize={10}
            columnsConfig={columns}
            exportEndpoint={"/api/customers/export"}
            deleteEndpoint={"/api/customers/delete"}
            deleteType={"SD"}
            trashView={`${ADMIN_TRASH}?trashof=customers`}
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  );
}
