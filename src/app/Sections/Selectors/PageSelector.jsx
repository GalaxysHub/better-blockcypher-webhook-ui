import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { setPageNum } from "../../../store/slices";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SelectWebhooksPerPage from "../../Components/Fields/SelectWebhooksPerPage";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridContainer: {
    marginLeft: "25px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  clickAble: {
    cursor: "pointer",
  },
  invisible: {
    visibility: "hidden",
  },
}));

const PageSelector = () => {
  const classes = useStyles();
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
    let cls = [classes.clickAble];
    if (!(pageNum > 1)) {
      cls.push(classes.invisible);
    }
    return (
      <ArrowBackIosIcon
        className={cls.join(" ")}
        onClick={() => dispatch(setPageNum(pageNum - 1))}
      />
    );
  };

  const renderNextBtn = () => {
    let cls = [classes.clickAble];
    if (!(pageNum < lastPageNum)) {
      cls.push(classes.invisible);
    }
    return (
      <ArrowForwardIosIcon
        className={cls.join(" ")}
        onClick={() => dispatch(setPageNum(pageNum + 1))}
      />
    );
  };

  return (
    <Container className={classes.container}>
      <Grid item xs={6}>
        <SelectWebhooksPerPage />
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <div className={classes.gridContainer}>
          {renderPrevBtn()}
          {`Page: ${pageNum} of ${lastPageNum}`}
          {renderNextBtn()}
        </div>
      </Grid>
    </Container>
  );
};

export default connect()(PageSelector);
