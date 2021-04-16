import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import StyledTableCell from "app/Components/Tables/StyledTableCell";
import StyledTableRow from "app/Components/Tables/StyledTableRow";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";

import { toast } from "react-toastify";

import DeleteIconBtn from "app/Components/Buttons/IconBtns/DeleteIconBtn";

import { deleteWebhookByID } from "APIs/blockcypherWebhooks";

import { removeWebhookById } from "redux/actions/webhookActions";

import CustomCheckBox from "app/Components/Fields/CustomCheckBox";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    position: "relative",
  },
  tableCell: {},
}));

const StyledTypography = withStyles((theme) => ({
  root: {
    color: theme.palette.grey.contrastText[theme.mode],
    fontSize: "16px",
  },
}))(Typography);

const NoWrapCell = ({ children }) => {
  const classes = useStyles();
  return (
    <StyledTableCell align="center">
      <StyledTypography className={classes.tableCell} noWrap>
        {children}
      </StyledTypography>
    </StyledTableCell>
  );
};

const WebhookTableBody = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.fieldsReducer);
  const { itemsPerPage, pageNum, activeCoin: coin } = useSelector(
    (state) => state.pageReducer
  );
  const { data } = useSelector((state) => state.webhookReducer[coin]);
  const [deletingMap, setDeletingMap] = useState({});
  let webhookIds = Object.keys(data);

  const fieldKeys = Object.keys(fields);
  let start = (pageNum - 1) * itemsPerPage;
  let end = start + itemsPerPage;

  useEffect(() => {
    console.log("new data");
  }, [data]);

  const deleteWebhook = async (id) => {
    try {
      setDeletingMap({ ...deletingMap, [id]: true });
      await deleteWebhookByID({ coin, id });
      dispatch(removeWebhookById({ coin, id }));
      toast(`Deleted Webhook ${id}`, {
        type: "success",
        position: "bottom-center",
      });
    } catch (err) {
      console.log("error deleting webhook", err);
    } finally {
      let newMap = { ...deletingMap };
      delete newMap[id];
      setDeletingMap(newMap);
    }
  };

  const renderOptionBtns = ({ id }) => {
    if (deletingMap[id]) {
      return <CircularProgress />;
    } else {
      return <DeleteIconBtn action={(event) => deleteWebhook(id)} />;
    }
  };

  return (
    <TableBody>
      {webhookIds.slice(start, end).map((id, index) => {
        let webhook = data[id];
        index = index + start;
        return (
          <StyledTableRow key={id}>
            <NoWrapCell>
              <CustomCheckBox />
              {index + 1}
            </NoWrapCell>
            {fieldKeys.map((name) => {
              let field = fields[name];
              let key = field.key;
              if (field.checked) {
                return (
                  <NoWrapCell key={key + "" + id}>{webhook[key]}</NoWrapCell>
                );
              } else return <></>;
            })}
            <NoWrapCell>{renderOptionBtns({ id })}</NoWrapCell>
          </StyledTableRow>
        );
      })}
    </TableBody>
  );
};

export default connect()(WebhookTableBody);
