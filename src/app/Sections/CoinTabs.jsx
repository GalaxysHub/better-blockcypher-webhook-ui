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
  minWidth: 0,
  maxWidth: "100%",
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  backgroundColor: theme.palette.grey.light[theme.mode],
  boxShadow: theme.palette.mode === "dark"
    ? "0 18px 42px rgba(0, 0, 0, 0.32)"
    : "0 18px 42px rgba(15, 23, 42, 0.08)",
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  background: theme.palette.gradient.header[theme.mode],
  color: theme.palette.primary.contrastText,
  boxShadow: "none",
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  maxWidth: "100%",
  minHeight: 48,
  "& .MuiTabs-scroller": {
    overflowX: "auto !important",
  },
  "& .MuiTabs-indicator": {
    height: 4,
    backgroundColor: theme.palette.primary.contrastText,
  },
  "& .MuiTab-root": {
    color: theme.palette.mode === "dark" ? "#f5f5f5" : "#d3d3d3",
    minWidth: 132,
  },
  "& .MuiTab-root.Mui-selected": {
    color: "white",
    backgroundColor: theme.palette.mode === "dark"
      ? theme.palette.secondary.main
      : "rgba(0, 0, 0, 0.28)",
  },
}));

const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  minWidth: 0,
  padding: "22px 24px 28px",
  backgroundColor: "transparent",
  [theme.breakpoints.down("sm")]: {
    padding: "16px 12px 22px",
  },
}));

const PanelContainer = styled(Container)(({ theme }) => ({
  display: "grid",
  gap: "18px",
  minWidth: 0,
  maxWidth: "100%",
  paddingLeft: "0 !important",
  paddingRight: "0 !important",
  marginBottom: "22px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "16px",
  },
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
    <StyledPaper elevation={0}>
      <TabContext value={value}>
        <StyledAppBar position="static">
          <StyledTabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {CoinList.map((coin) => {
              return (
                <Tab key={coin.name} label={coin.name} value={coin.abbr} data-testid={`coin-tab-${coin.abbr}`} />
              );
            })}
          </StyledTabList>
        </StyledAppBar>
        {CoinList.map((coin) => {
          return (
            <StyledTabPanel
              key={coin.name}
              value={coin.abbr}
            >
              <PanelContainer maxWidth={false}>
                <AccordionComp
                  title={`Create ${CoinData[coin.abbr].name} Webhook`}
                >
                  <CreateWebhookForm />
                </AccordionComp>
                <NumWebhooksNote />
              </PanelContainer>
              <TableSection />
            </StyledTabPanel>
          );
        })}
      </TabContext>
    </StyledPaper>
  );
};

export default LabTabs;
