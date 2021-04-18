import React, { useEffect } from "react";

import { connect, useDispatch } from "react-redux";
import Header from "./Sections/Header";

import CoinTabs from "./Sections/CoinTabs";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navbar from "app/Sections/Navbar";
import Footer from "app/Sections/Footer";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { getTokenDets } from "APIs/blockcypherWebhooks";
import { TOKEN } from "config/blockcypher";

import { setTokenDets } from "redux/actions/tokenActions";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    textAlign: "center",
    color: theme.palette.page.text[theme.mode],
    backgroundColor: theme.palette.page.background[theme.mode],
  },
  pageContainer: {
    paddingBottom: "24px",
  },
}));

toast.configure();

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    getTokenDets(TOKEN)
      .then((res) => {
        dispatch(setTokenDets(res.data));
      })
      .catch((err) => {
        console.log(`Error fetching token details: `, err);
      });
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Navbar />
      <Container className={classes.pageContainer}>
        <Header />
        <CoinTabs />
      </Container>
      <Footer />
    </div>
  );
}

export default connect()(App);
