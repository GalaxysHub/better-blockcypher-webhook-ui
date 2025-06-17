import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import IconBtnTemplate from "./IconBtnTemplate";

export default function DeleteIconBtn({
  action,
  type = "danger",
  size = "small",
  tip = "Delete",
}) {
  return (
    <IconBtnTemplate type={type} action={action} tip={tip}>
      <DeleteIcon size={size} />
    </IconBtnTemplate>
  );
}
