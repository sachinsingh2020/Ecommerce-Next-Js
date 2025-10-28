import { ListItemIcon, MenuItem } from "@mui/material";
import Link from "next/link";
import { RemoveRedEye } from "@mui/icons-material";

const ViewAction = ({ href }) => {
  return (
    <MenuItem key="view">
      <Link className="flex items-center" href={href}>
        <ListItemIcon>
          <RemoveRedEye />
        </ListItemIcon>
        View
      </Link>
    </MenuItem>
  );
};

export default ViewAction;
