import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import { CoinList, CoinData } from "_config/coinData";

import CreateWebhookForm from "./CreateWebhookForm";
import AccordionComp from "app/Components/AccordionComp";
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
    <StyledPaper elevation={12} data-testid="coin-tabs-paper">
      <TabContext value={value} data-testid="coin-tabs-context">
        <AppBar position="static" data-testid="coin-tabs-appbar">
          <StyledTabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            data-testid="coin-tabs-list"
          >
            {CoinList.map((coin) => {
              return (
                <Tab key={coin.name} label={coin.name} value={coin.abbr} data-testid={`coin-tab-${coin.abbr}`} />
              );
            })}
          </StyledTabList>
        </AppBar>
        {CoinList.map((coin) => {
          return (
            <StyledTabPanel
              key={coin.name}
              value={coin.abbr}
              data-testid={`coin-tab-panel-${coin.abbr}`}
            >
              <Container data-testid={`coin-tab-container-${coin.abbr}`}>
                <AccordionComp
                  title={`Create ${CoinData[coin.abbr].name} Webhook`}
                  data-testid={`create-webhook-accordion-${coin.abbr}`}
                >
                  <CreateWebhookForm data-testid={`create-webhook-form-${coin.abbr}`} />
                </AccordionComp>
                <NumWebhooksNote data-testid={`num-webhooks-note-${coin.abbr}`} />
              </Container>
              <br />
              <TableSection data-testid={`table-section-${coin.abbr}`} />
            </StyledTabPanel>
          );
        })}
      </TabContext>
    </StyledPaper>
  );
};

export default LabTabs;
