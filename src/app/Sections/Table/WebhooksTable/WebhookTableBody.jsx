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

const NoWrapCell = ({ children }) => {
  return (
    <StyledTableCell align="center">
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
  const token = useSelector((state) => state.tokenReducer.token);
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
      await deleteWebhookByID({ coin, id, token });
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
      return <CircularProgress />;
    } else {
      return <DeleteIconBtn 
        action={() => deleteWebhook(id)}
        data-testid={`delete-webhook-${id}`}
      />;
    }
  };

  const renderAddressCellContent = (address) => {
    let param = CoinData[coin].COIN;
    if (coin === "BTCt") param = "btc-testnet";
    let url = `https://live.blockcypher.com/${param}/address/${address}/`;
    return (
      <NoWrapCell>
        <a 
          href={url} 
          style={{ textDecoration: "none", color: "inherit" }}
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
    <TableBody>
      {webhookIds.slice(start, end).map((id, index) => {
        index = index + start;
        return (
          <StyledTableRow key={id} data-testid={`webhook-row-${id}`}>
            <NoWrapCell 
              key={"checkbox" + id}
            >
              <CustomCheckBox
                checked={selectedMap[id] || false}
                onChange={() => onSelect(id)}
                data-testid={`webhook-checkbox-${id}`}
              />
              {index + 1}
            </NoWrapCell>
            {renderFieldCells(id)}
            <NoWrapCell 
              key={"options" + id}
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
