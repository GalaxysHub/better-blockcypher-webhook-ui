import React from "react";
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
}));

function DeleteAllBtn() {
  const classes = useStyles();

  const selectedWebhooks = useSelector(
    (state) => state.webhookReducer.selected
  );
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <DeleteWebhooksModal open={open} setOpen={setOpen} />
      {Object.keys(selectedWebhooks).length ? (
        <button className={classes.button} onClick={() => setOpen(true)}>
          {`Delete ${Object.keys(selectedWebhooks).length} Webhooks?`}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default connect()(DeleteAllBtn);
