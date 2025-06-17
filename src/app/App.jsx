import React, { useEffect } from "react";

import { connect, useDispatch } from "react-redux";
import Header from "./Sections/Header";

import CoinTabs from "./Sections/CoinTabs";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Navbar from "./Sections/Navbar";
import Footer from "./Sections/Footer";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { getTokenDets } from "APIs/blockcypherWebhooks";
import { TOKEN } from "config/blockcypher";

import { setTokenDets } from "store/slices";

const RootDiv = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  textAlign: "center",
  color: theme.palette.page?.text?.[theme.mode] || theme.palette.text.primary,
  backgroundColor: theme.palette.page?.background?.[theme.mode] || theme.palette.background.default,
}));

const StyledContainer = styled(Container)({
  paddingBottom: "24px",
});

function App() {
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
    <RootDiv>
      <Navbar />
      <StyledContainer>
        <Header />
        <CoinTabs />
      </StyledContainer>
      <Footer />
      <ToastContainer />
    </RootDiv>
  );
}

export default connect()(App);
