import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { setPageNum } from "redux/actions/pageActions";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SelectWebhooksPerPage from "app/Components/Fields/SelectWebhooksPerPage";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "8px",
  },
  container: {
    margin: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  tableCell: {
    fontSize: "16px",
  },
  clickAble: {
    cursor: "pointer",
  },
  invisible: {
    visibility: "hidden",
  },
}));

const PageSelector = ({ coin }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { itemsPerPage, pageNum } = useSelector((state) => state.pageReducer);
  const webhooks = useSelector((state) => state.webhookReducer[coin].data);
  const numWebhooks = Object.keys(webhooks).length;
  let lastPageNum = Math.ceil(numWebhooks / itemsPerPage);
  console.log(`itemsPerPage`, itemsPerPage);
  console.log(`lastPageNum`, lastPageNum);

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
    <Paper elevation={11} className={classes.root}>
      <Container className={classes.container}>
        <Grid item xs={4}>
          <SelectWebhooksPerPage />
        </Grid>
        <Grid
          container
          xs={8}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {renderPrevBtn()}
          {`Page: ${pageNum} of ${lastPageNum}`}
          {renderNextBtn()}
        </Grid>
      </Container>
    </Paper>
  );
};

export default connect()(PageSelector);
