import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { setPageNum } from "store/slices";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SelectWebhooksPerPage from "app/Components/Fields/SelectWebhooksPerPage";

const StyledContainer = styled(Container)({
  margin: "10px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledGridContainer = styled('div')({
  marginLeft: "25px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const ClickableIcon = styled('div')({
  cursor: "pointer",
  "&.invisible": {
    visibility: "hidden",
  },
});

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
        data-testid="page-selector-prev-btn"
      >
        <ArrowBackIosIcon
          onClick={() => dispatch(setPageNum(pageNum - 1))}
          data-testid="page-selector-prev-icon"
        />
      </ClickableIcon>
    );
  };

  const renderNextBtn = () => {
    return (
      <ClickableIcon 
        className={pageNum >= lastPageNum ? "invisible" : ""}
        data-testid="page-selector-next-btn"
      >
        <ArrowForwardIosIcon
          onClick={() => dispatch(setPageNum(pageNum + 1))}
          data-testid="page-selector-next-icon"
        />
      </ClickableIcon>
    );
  };

  return (
    <StyledContainer data-testid="page-selector-container">
      <Grid item xs={6} data-testid="page-selector-select-grid">
        <SelectWebhooksPerPage data-testid="page-selector-webhooks-per-page" />
      </Grid>
      <Grid 
        container 
        direction="column" 
        justify="center" 
        alignItems="center"
        data-testid="page-selector-navigation-grid"
      >
        <StyledGridContainer data-testid="page-selector-navigation-container">
          {renderPrevBtn()}
          <span data-testid="page-selector-page-display">{`Page: ${pageNum} of ${lastPageNum}`}</span>
          {renderNextBtn()}
        </StyledGridContainer>
      </Grid>
    </StyledContainer>
  );
};

export default PageSelector;
