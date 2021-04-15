import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import StyledTableCell from "app/Components/Tables/StyledTableCell";
import StyledTableRow from "app/Components/Tables/StyledTableRow";

import TableBody from "@material-ui/core/TableBody";

import Typography from "@material-ui/core/Typography";

import { toast } from "react-toastify";

import DeleteIconBtn from "app/Components/Buttons/IconBtns/DeleteIconBtn";

import { deleteWebhookByID } from "APIs/blockcypherWebhooks";

import { removeWebhookById } from "redux/actions/webhookActions";
import { CircularProgress } from "@material-ui/core";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    position: "relative",
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

const WebhookTableBody = ({ setData, data, coin }) => {
  let webhookIds = Object.keys(data);
  const fields = useSelector((state) => state.fieldsReducer);
  const { itemsPerPage, pageNum } = useSelector((state) => state.pageReducer);
  const fieldKeys = Object.keys(fields);
  const startIndex = (pageNum - 1) * itemsPerPage;

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

  const renderOptionBtns = ({ id, deleting }) => {
    if (deleting) {
      return <CircularProgress />;
    } else {
      return <DeleteIconBtn action={(event) => deleteWebhook(id, event)} />;
    }
  };

  const renderRows = () => {
    for (let i = 0; i < itemsPerPage; i++) {}
  };

  return (
    <TableBody>
      {webhookIds.map((id, index) => {
        let webhook = data[id];
        let { deleting } = webhook;
        return (
          <StyledTableRow key={id}>
            <NoWrapCell>{index + 1}</NoWrapCell>
            {fieldKeys
              .slice(startIndex, startIndex + itemsPerPage)
              .map((name) => {
                let field = fields[name];
                let key = field.key;
                if (field.checked) {
                  return (
                    <NoWrapCell key={key + "" + id}>{webhook[key]}</NoWrapCell>
                  );
                }
              })}
            <NoWrapCell>{renderOptionBtns({ id, deleting })}</NoWrapCell>
          </StyledTableRow>
        );
      })}
    </TableBody>
  );
};

WebhookTableBody.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  coin: PropTypes.string.isRequired,
};

export default connect()(WebhookTableBody);
