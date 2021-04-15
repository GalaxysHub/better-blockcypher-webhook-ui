import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import StyledTableCell from "app/Components/Tables/StyledTableCell";
import StyledTableRow from "app/Components/Tables/StyledTableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { toast } from "react-toastify";

import DeleteIconBtn from "app/Components/Buttons/IconBtns/DeleteIconBtn";
import RefreshIconBtn from "app/Components/Buttons/IconBtns/RefreshIconBtn";

import { getWebhooksByCoin, deleteWebhookByID } from "APIs/blockcypherWebhooks";
import { convertWebhookArrToObj, createSortedKeyMap } from "utils";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import {
  setWebhookData,
  removeWebhookById,
} from "redux/actions/webhookActions";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    position: "relative",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  clickAble: {
    cursor: "pointer",
  },
  tableCell: {
    fontSize: "16px",
  },
}));

const NoWrapCell = ({ children }) => {
  const classes = useStyles();

  return (
    <StyledTableCell align="center">
      <Typography className={classes.tableCell} noWrap>
        {children}
      </Typography>
    </StyledTableCell>
  );
};

const WebhookTableHeaders = ({ data, setData }) => {
  const classes = useStyles();

  const SortableHeaders = [
    { name: "ID", value: "id", sort: "asc" },
    { name: "Address", value: "address" },
    { name: "Event", value: "event" },
    { name: "URL", value: "url" },
    { name: "CallbackErrors", value: "callback_errors" },
  ];

  const sort = (key, order) => {
    let sortedData = createSortedKeyMap(data, key, order);
    setData(sortedData);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="center"></StyledTableCell>
        {SortableHeaders.map((header) => {
          return (
            <StyledTableCell align="center">
              <div className={classes.tableHeader}>
                <ArrowDropUpIcon
                  className={classes.clickAble}
                  onClick={(event) => sort(header.value, "asc", event)}
                />
                {header.name}
                <ArrowDropDownIcon
                  className={classes.clickAble}
                  onClick={(event) => sort(header.value, "desc", event)}
                />
              </div>
            </StyledTableCell>
          );
        })}
        <StyledTableCell align="center">Options</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

const WebhookTableBody = ({ setData, data, coin }) => {
  let webhookIds = Object.keys(data);

  const deleteWebhook = async (id, event) => {
    try {
      data[id].deleting = true;
      setData({ ...data });
      await deleteWebhookByID({ coin, id });
      await removeWebhookById({ coin, id });
      delete data[id];
      toast("Webhook Deleted successfully", {
        type: "success",
        position: "bottom-center",
      });
    } catch (err) {
      data[id].deleting = false;
    } finally {
      setData({ ...data });
    }
  };

  return (
    <TableBody>
      {webhookIds.map((id, index) => {
        let webhook = data[id];
        const { address, event, url, callback_errors, deleting } = webhook;
        return (
          <StyledTableRow key={id}>
            <NoWrapCell>{index + 1}</NoWrapCell>
            <NoWrapCell>{id}</NoWrapCell>
            <NoWrapCell>{address}</NoWrapCell>
            <NoWrapCell>{event}</NoWrapCell>
            <NoWrapCell>{url}</NoWrapCell>
            <NoWrapCell>{callback_errors}</NoWrapCell>
            <StyledTableCell>
              {deleting ? (
                <CircularProgress />
              ) : (
                <DeleteIconBtn action={(event) => deleteWebhook(id, event)} />
              )}
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
    </TableBody>
  );
};

const WebhookTable = ({ coin }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const webhookData = useSelector((state) => state.webhookReducer[coin]);
  const [data, setData] = useState({});
  const [fetching, setFetching] = useState(false);

  async function fetchCoinData() {
    try {
      let fetchedData = await getWebhooksByCoin(coin);
      let dataObj = convertWebhookArrToObj(fetchedData);
      setData(dataObj);
      dispatch(setWebhookData({ coin, data: dataObj }));
    } catch (err) {
      console.log(`Error fetching coin webhook data:`, err);
    }
  }

  useEffect(() => {
    if (!webhookData.fetched) fetchCoinData();
    else setData(webhookData.data);
  }, [dispatch, coin, webhookData]);

  const renderTable = (data) => {
    if (!webhookData.fetched) {
      return <CircularProgress />;
    } else if (Object.keys(data).length === 0) {
      return (
        <Paper style={{ width: "300px", margin: "auto" }} elevation={12}>
          <div
            style={{
              color: "red",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              height: "80px",
            }}
          >
            No Webhooks Found
          </div>
        </Paper>
      );
    } else {
      return (
        <div>
          {fetching ? (
            <CircularProgress />
          ) : (
            <RefreshIconBtn
              action={async () => {
                await setFetching(true);
                await fetchCoinData();
                await setFetching(false);
              }}
            />
          )}
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <WebhookTableHeaders setData={setData} data={data} />
              <WebhookTableBody setData={setData} data={data} coin={coin} />
            </Table>
          </TableContainer>
        </div>
      );
    }
  };
  return <>{renderTable(data)}</>;
};

export default connect()(WebhookTable);
