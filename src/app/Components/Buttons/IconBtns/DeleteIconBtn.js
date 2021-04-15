import React from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import IconBtnTemplate from "./IconBtnTemplate";

export default function DeleteIconBtn({
  action,
  type = "danger",
  size = "small",
  tip = "Delete",
}) {
  return (
    <IconBtnTemplate
      type={type}
      action={action}
      icon={<DeleteIcon fontSize={size} />}
      tip={tip}
    />
  );
}
