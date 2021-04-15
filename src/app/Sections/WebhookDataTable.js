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

import DeleteIconBtn from "app/Components/Buttons/IconBtns/DeleteIconBtn";

import { getWebhooksByCoin, deleteWebhookByID } from "APIs/blockcypherWebhooks";
import { convertWebhookArrToObj } from "utils";

import {
  setWebhookData,
  removeWebhookById,
} from "redux/actions/webhookActions";
import { CircularProgress, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    position: "relative",
  },
  tableCell: {
    fontSize: "12px",
  },
}));

const WebhookTableHeaders = () => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="center"></StyledTableCell>
        <StyledTableCell align="center">ID</StyledTableCell>
        <StyledTableCell align="center">Address</StyledTableCell>
        <StyledTableCell align="center">Event</StyledTableCell>
        <StyledTableCell align="center">URL</StyledTableCell>
        <StyledTableCell align="center">CallbackErrors</StyledTableCell>
        <StyledTableCell align="center">Options</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

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

const WebhookDataTableBody = ({ webhookData, coin }) => {
  const [data, setData] = useState({});
  const [fetched, setFetched] = useState(false);
  let webhookIds = Object.keys(data);

  useEffect(() => {
    console.log("new data");
    setData(webhookData.data);
    setFetched(webhookData.fetched);
  }, [webhookData]);

  const deleteWebhook = async (id, event) => {
    console.log(`id`, id);
    try {
      data[id].deleting = true;
      setData({ ...data });
      await deleteWebhookByID({ coin, id });
      await removeWebhookById({ coin, id });
      delete data[id];
      setData({ ...data });
    } catch (err) {
      data[id].deleting = false;
      setData({ ...data });
    } finally {
    }
  };

  return (
    <>
      {fetched ? (
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
                    <DeleteIconBtn
                      action={(event) => deleteWebhook(id, event)}
                    />
                  )}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      ) : (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            width: "100vw",
          }}
        >
          <CircularProgress
            style={{
              transform: "translateX(-50%)",
            }}
          />
        </div>
      )}
    </>
  );
};

const WebhookDataTable = ({ coin }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const webhookData = useSelector((state) => state.webhookReducer[coin]);

  useEffect(() => {
    async function fetchCoinData() {
      try {
        let data = await getWebhooksByCoin(coin);
        let webhookData = convertWebhookArrToObj(data);
        dispatch(setWebhookData({ coin, webhookData }));
      } catch (err) {
        console.log(`Error fetching coin webhook data:`, err);
      }
    }
    fetchCoinData();
  }, [dispatch, coin]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <WebhookTableHeaders />
        <WebhookDataTableBody webhookData={webhookData} coin={coin} />
      </Table>
    </TableContainer>
  );
};

export default connect()(WebhookDataTable);
