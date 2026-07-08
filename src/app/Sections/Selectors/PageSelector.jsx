import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import { setPageNum } from "store/slices";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SelectWebhooksPerPage from "app/Components/Fields/SelectWebhooksPerPage";

const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  minWidth: 0,
  padding: "12px 16px 14px",
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("sm")]: {
    alignItems: "stretch",
    flexDirection: "column",
  },
}));

const SelectContainer = styled("div")(({ theme }) => ({
  width: 220,
  minWidth: 0,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const StyledGridContainer = styled('div')(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "8px",
  minWidth: 180,
  color: theme.palette.text.secondary,
  fontSize: 14,
  fontWeight: 700,
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const ClickableIcon = styled(IconButton)(({ theme }) => ({
  width: 34,
  height: 34,
  color: theme.palette.text.secondary,
  borderRadius: 8,
  "&:hover": {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
  },
  "&.invisible": {
    visibility: "hidden",
  },
}));

const PageSelector = () => {
  const dispatch = useDispatch();
  const { itemsPerPage, pageNum, activeCoin } = useSelector(
    (state) => state.pageReducer
  );
  const webhooks = useSelector(
    (state) => state.webhookReducer[activeCoin].data
  );
  const numWebhooks = Object.keys(webhooks).length;
  let lastPageNum = Math.ceil(numWebhooks / itemsPerPage);

  const renderPrevBtn = () => {
    return (
      <ClickableIcon 
        className={pageNum <= 1 ? "invisible" : ""}
        onClick={() => dispatch(setPageNum(pageNum - 1))}
        aria-label="previous page"
      >
        <ArrowBackIosIcon fontSize="small" />
      </ClickableIcon>
    );
  };

  const renderNextBtn = () => {
    return (
      <ClickableIcon 
        className={pageNum >= lastPageNum ? "invisible" : ""}
        onClick={() => dispatch(setPageNum(pageNum + 1))}
        aria-label="next page"
      >
        <ArrowForwardIosIcon fontSize="small" />
      </ClickableIcon>
    );
  };

  return (
    <StyledContainer>
      <SelectContainer>
        <SelectWebhooksPerPage />
      </SelectContainer>
        <StyledGridContainer>
          {renderPrevBtn()}
          <span>{`Page: ${pageNum} of ${lastPageNum}`}</span>
          {renderNextBtn()}
        </StyledGridContainer>
    </StyledContainer>
  );
};

export default PageSelector;
