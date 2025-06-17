import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import { CoinList, CoinData } from "../../_config/coinData";

import CreateWebhookForm from "./CreateWebhookForm";
import AccordionComp from "../Components/AccordionComp";
import TableSection from "./Table/TableSection";
import NumWebhooksNote from "./NumWebhooksNote";

import { setActiveCoin } from "store/slices";

const StyledPaper = styled(Paper)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.grey.light[theme.mode],
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  background: theme.palette.primary[theme.mode],
}));

const StyledTabPanel = styled(TabPanel)(() => ({
  // Custom styles for tab panel if needed
}));

const LabTabs = () => {
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const [value, setValue] = React.useState(coin);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setActiveCoin(newValue));
  };

  return (
    <StyledPaper elevation={12}>
      <TabContext value={value}>
        <AppBar position="static">
          <StyledTabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {CoinList.map((coin) => {
              return (
                <Tab key={coin.name} label={coin.name} value={coin.abbr} />
              );
            })}
          </StyledTabList>
        </AppBar>
        {CoinList.map((coin) => {
          return (
            <StyledTabPanel
              key={coin.name}
              value={coin.abbr}
            >
              <Container>
                <AccordionComp
                  title={`Create ${CoinData[coin.abbr].name} Webhook`}
                >
                  <CreateWebhookForm />
                </AccordionComp>
                <NumWebhooksNote />
              </Container>
              <br />
              <TableSection />
            </StyledTabPanel>
          );
        })}
      </TabContext>
    </StyledPaper>
  );
};

export default connect()(LabTabs);
