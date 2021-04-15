import "styles/App.css";
import { connect, useSelector } from "react-redux";
import Header from "./Sections/Header";

import CoinTabs from "./Sections/CoinTabs";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navbar from "app/Sections/Navbar";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    textAlign: "center",
    color: theme.palette.page.text[theme.mode],
    backgroundColor: theme.palette.page.background[theme.mode],
  },
}));

toast.configure();

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <Container>
        <Header />
        <CoinTabs />
      </Container>
    </div>
  );
}

export default connect()(App);
