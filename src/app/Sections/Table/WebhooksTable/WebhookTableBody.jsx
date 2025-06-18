import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";

import StyledTableCell from "app/Components/Tables/StyledTableCell";
import StyledTableRow from "app/Components/Tables/StyledTableRow";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CustomCheckBox from "app/Components/Fields/CustomCheckBox";

import { toast } from "react-toastify";

import DeleteIconBtn from "app/Components/Buttons/IconBtns/DeleteIconBtn";

import { deleteWebhookByID } from "APIs/blockcypherWebhooks";

import { removeWebhookById, markWebhooks } from "store/slices";

import { CoinData } from "_config/coinData";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey?.contrastText?.[theme.mode] || theme.palette.text.primary,
  fontSize: "16px",
}));

const NoWrapCell = ({ children, testId }) => {
  return (
    <StyledTableCell align="center" data-testid={testId}>
      <StyledTypography noWrap>
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
  const webhooks = useSelector((state) => state.webhookReducer[coin].data);
  const selectedWebhooks = useSelector(
    (state) => state.webhookReducer.selected
  );
  const [deletingMap, setDeletingMap] = useState({});
  const [selectedMap, setSelectedMap] = useState({});
  let webhookIds = Object.keys(webhooks);

  const fieldKeys = Object.keys(fields);
  let start = (pageNum - 1) * itemsPerPage;
  let end = start + itemsPerPage;

  useEffect(() => {
    setSelectedMap(selectedWebhooks);
  }, [selectedWebhooks]);

  const onSelect = (id) => {
    dispatch(markWebhooks({ [id]: !selectedWebhooks[id] }));
    setSelectedMap({ ...selectedMap, [id]: !selectedWebhooks[id] });
  };

  const deleteWebhook = async (id) => {
    try {
      setDeletingMap({ ...deletingMap, [id]: true });
      await deleteWebhookByID({ coin, id });
      dispatch(removeWebhookById({ coin, id }));
      dispatch(markWebhooks({ [id]: false }));
      toast(`Deleted Webhook ${id}`, {
        type: "success",
        position: "bottom-center",
      });
    } catch (err) {
      console.log("error deleting webhook", err);
      toast(`Error Deleting Webhook ${id}: ${err.message}`, {
        type: "error",
        position: "bottom-center",
      });
    } finally {
      let newMap = { ...deletingMap };
      delete newMap[id];
      setDeletingMap(newMap);
    }
  };

  const renderOptionBtns = ({ id }) => {
    if (deletingMap[id]) {
      return <CircularProgress data-testid={`webhook-table-row-${id}-delete-loading`} />;
    } else {
      return <DeleteIconBtn 
        action={() => deleteWebhook(id)} 
        data-testid={`webhook-table-row-${id}-delete-btn`}
      />;
    }
  };

  const renderAddressCellContent = (address) => {
    let param = CoinData[coin].COIN;
    if (coin === "BTCt") param = "btc-testnet";
    let url = `https://live.blockcypher.com/${param}/address/${address}/`;
    return (
      <NoWrapCell testId={`webhook-table-cell-address-${address}`}>
        <a 
          href={url} 
          style={{ textDecoration: "none", color: "inherit" }}
          data-testid={`webhook-table-address-link-${address}`}
        >
          {address}
        </a>
      </NoWrapCell>
    );
  };

  const renderFieldCells = (id) => {
    let webhook = webhooks[id];
    return (
      <>
        {fieldKeys.map((key) => {
          let field = fields[key];
          let name = field.name;
          if (field.checked) {
            if (name === "Address") {
              return renderAddressCellContent(webhook["address"]);
            }
            return (
              <NoWrapCell 
                key={key + "" + id} 
                testId={`webhook-table-cell-${key}-${id}`}
              >
                {webhook[key]}
              </NoWrapCell>
            );
          } else return <></>;
        })}
      </>
    );
  };

  return (
    <TableBody data-testid="webhook-table-body">
      {webhookIds.slice(start, end).map((id, index) => {
        index = index + start;
        return (
          <StyledTableRow key={id} data-testid={`webhook-table-row-${id}`}>
            <NoWrapCell 
              key={"checkbox" + id} 
              testId={`webhook-table-cell-checkbox-${id}`}
            >
              <CustomCheckBox
                checked={selectedMap[id] || false}
                onChange={() => onSelect(id)}
                data-testid={`webhook-table-row-${id}-checkbox`}
              />
              {index + 1}
            </NoWrapCell>
            {renderFieldCells(id)}
            <NoWrapCell 
              key={"options" + id} 
              testId={`webhook-table-cell-options-${id}`}
            >
              {renderOptionBtns({ id })}
            </NoWrapCell>
          </StyledTableRow>
        );
      })}
    </TableBody>
  );
};

export default WebhookTableBody;
