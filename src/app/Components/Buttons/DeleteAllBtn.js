import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import DeleteWebhooksModal from "app/Components/DeleteWebhooksModal";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px",
  },
  button: {
    cursor: "pointer",
    color: "white",
    backgroundColor: "#f44336",
    border: "1px solid black",
    borderRadius: "10px",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    " &:hover": {
      filter: "brightness(85%)",
    },
  },
  invisible: {
    visibility: "hidden",
  },
}));

function DeleteAllBtn() {
  const classes = useStyles();

  const selectedWebhooks = useSelector(
    (state) => state.webhookReducer.selected
  );
  const [open, setOpen] = useState(false);
  let numSelected = Object.keys(selectedWebhooks).length;
  let btnClasses = [classes.button];
  if (numSelected === 0) btnClasses = [classes.button, classes.invisible];

  return (
    <div className={classes.root}>
      <DeleteWebhooksModal open={open} setOpen={setOpen} />
      <button className={btnClasses.join(" ")} onClick={() => setOpen(true)}>
        {`Delete ${numSelected} Webhooks?`}
      </button>
    </div>
  );
}

export default connect()(DeleteAllBtn);
