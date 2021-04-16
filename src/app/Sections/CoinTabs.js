import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import { CoinList, CoinData } from "config/coinData";

import CreateWebhookForm from "./CreateWebhookForm";
import AccordionComp from "app/Components/AccordionComp";
import TableSection from "./Table/TableSection";
import NumWebhooksNote from "./NumWebhooksNote";

import { setActiveCoin } from "redux/actions/pageActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey.light[theme.mode],
  },
  tabList: {
    background: theme.palette.primary[theme.mode],
  },
  tab: {
    // padding: "0px",
  },
}));

const LabTabs = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const [value, setValue] = React.useState(coin);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setActiveCoin(newValue));
  };

  return (
    <Paper className={classes.root} elevation={12}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList
            className={classes.tabList}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {CoinList.map((coin) => {
              return (
                <Tab key={coin.name} label={coin.name} value={coin.abbr} />
              );
            })}
          </TabList>
        </AppBar>
        {CoinList.map((coin) => {
          return (
            <TabPanel
              key={coin.name}
              value={coin.abbr}
              classes={{ root: classes.tab }}
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
            </TabPanel>
          );
        })}
      </TabContext>
    </Paper>
  );
};

export default connect()(LabTabs);
