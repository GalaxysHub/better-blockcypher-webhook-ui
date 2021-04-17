import React from "react";

import CloseIcon from "@material-ui/icons/Close";
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
