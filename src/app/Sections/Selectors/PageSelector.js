import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { setPageNum } from "redux/actions/pageActions";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SelectWebhooksPerPage from "app/Components/Fields/SelectWebhooksPerPage";

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
      <Grid item xs={4}>
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
