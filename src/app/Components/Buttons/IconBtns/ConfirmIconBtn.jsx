import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import IconBtnTemplate from "./IconBtnTemplate";

export default function ConfirmIconBtn({
  action,
  type = "success",
  size = "small",
  tip = "Confirm",
}) {
  return (
    <IconBtnTemplate type={type} action={action} tip={tip}>
      <CheckIcon size={size} />
    </IconBtnTemplate>
  );
}
