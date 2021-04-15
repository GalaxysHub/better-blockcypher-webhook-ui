import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

import { CoinList, CoinData } from "config/coinData";

import WebhookDataTable from "./WebhookDataTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function LabTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState("BCY");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {CoinList.map((coin) => {
              return <Tab label={coin.name} value={coin.abbr} />;
            })}
          </TabList>
        </AppBar>
        {CoinList.map((coin) => {
          return (
            <TabPanel value={coin.abbr}>
              {coin.name}
              <WebhookDataTable coin={coin.abbr} />
            </TabPanel>
          );
        })}
      </TabContext>
    </div>
  );
}
