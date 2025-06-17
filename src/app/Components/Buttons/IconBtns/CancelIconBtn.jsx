import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import IconBtnTemplate from "./IconBtnTemplate";

export default function CancelIconBtn({
  action,
  type = "danger",
  size = "small",
  tip = "Cancel",
}) {
  return (
    <IconBtnTemplate type={type} action={action} tip={tip}>
      <CloseIcon size={size} />
    </IconBtnTemplate>
  );
}
