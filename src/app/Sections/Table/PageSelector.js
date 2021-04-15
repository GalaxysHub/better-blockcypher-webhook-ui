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
    if (pageNum > 1) {
      return (
        <ArrowBackIosIcon onClick={() => dispatch(setPageNum(pageNum - 1))} />
      );
    }
  };

  const renderNextBtn = () => {
    if (pageNum < lastPageNum) {
      return (
        <ArrowForwardIosIcon
          onClick={() => dispatch(setPageNum(pageNum + 1))}
        />
      );
    }
  };

  return (
    <Paper elevation={11} className={classes.root}>
      <Container className={classes.container}>
        <Grid item xs={4}>
          <SelectWebhooksPerPage />
        </Grid>
        <Grid item xs={8}>
          {renderPrevBtn()}
          {`Page: ${pageNum} of ${lastPageNum}`}
          {renderNextBtn()}
        </Grid>
      </Container>
    </Paper>
  );
};

export default connect()(PageSelector);
