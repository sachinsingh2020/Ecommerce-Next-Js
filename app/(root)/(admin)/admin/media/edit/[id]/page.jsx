"use client";
import { use } from "react";
import useFetch from "@/hooks/useFetch";
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from "@/routes/AdminPanelRoute";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const breadCrumbData = [
  {
    href: ADMIN_DASHBOARD,
    label: "Home",
  },
  {
    href: ADMIN_MEDIA_SHOW,
    label: "Media",
  },
  {
    href: "",
    label: "Edit Media",
  },
];

export default function EditMedia({ params }) {
  const { id } = use(params);
  const { data: mediaData } = useFetch(`/api/media/get/${id}`);
  console.log({ mediaData });
  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData} />
      <Card className={"py-0 rounded shadow-sm"}>
        <CardHeader
          className={"pt-3 px-3 border-b [.border-b]:pb-2"}></CardHeader>
        <CardContent className={"pb-5"}></CardContent>
      </Card>
    </div>
  );
}
