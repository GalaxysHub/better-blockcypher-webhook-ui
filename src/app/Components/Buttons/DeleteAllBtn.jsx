import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import DeleteWebhooksModal from "app/Sections/Modals/DeleteWebhooksModal";

const RootDiv = styled('div')(() => ({
  display: "flex",
  justifyContent: "flex-end",
  minHeight: 40,
}));

const DeleteButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "invisible",
})(({ invisible }) => ({
  visibility: invisible ? "hidden" : "visible",
  backgroundColor: "#f44336",
  color: "white",
  border: "1px solid black",
  "&:hover": {
    backgroundColor: "#f44336",
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
        variant="contained"
        startIcon={<DeleteSweepIcon />}
        onClick={() => setOpen(true)}
        data-testid="delete-all-btn"
      >
        {`Delete ${numSelected} Webhooks?`}
      </DeleteButton>
    </RootDiv>
  );
}

export default DeleteAllBtn;
