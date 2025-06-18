import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import DeleteWebhooksModal from "app/Sections/Modals/DeleteWebhooksModal";

const RootDiv = styled('div')(() => ({
  margin: "16px",
}));

const DeleteButton = styled('button')(({ invisible }) => ({
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
  visibility: invisible ? "hidden" : "visible",
  "&:hover": {
    filter: "brightness(85%)",
  },
}));

function DeleteAllBtn() {
  const selectedWebhooks = useSelector(
    (state) => state.webhookReducer.selected
  );
  const [open, setOpen] = useState(false);
  let numSelected = Object.keys(selectedWebhooks).length;
  const isInvisible = numSelected === 0;

  return (
    <RootDiv>
      <DeleteWebhooksModal open={open} setOpen={setOpen} />
      <DeleteButton 
        invisible={isInvisible} 
        onClick={() => setOpen(true)}
        data-testid="delete-all-btn"
      >
        {`Delete ${numSelected} Webhooks?`}
      </DeleteButton>
    </RootDiv>
  );
}

export default DeleteAllBtn;
