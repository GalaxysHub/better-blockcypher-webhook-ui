import React from "react";

import RefreshIcon from "@material-ui/icons/Refresh";
import IconBtnTemplate from "./IconBtnTemplate";

export default function DeleteIconBtn({
  action,
  type = "info",
  size = "medium",
  tip = "Refetch Webhooks",
}) {
  return (
    <IconBtnTemplate type={type} action={action} tip={tip}>
      <RefreshIcon size={size} />
    </IconBtnTemplate>
  );
}
