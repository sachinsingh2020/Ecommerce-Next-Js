import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: "", label: "Media" },
];

export default function MediaPage() {
  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
    </div>
  );
}
