import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import StyledTableCell from "app/Components/Tables/StyledTableCell";
import WhiteCheckBox from "app/Components/Fields/WhiteCheckBox";

import { setWebhookData, markWebhooks } from "store/slices";

import { createSortedKeyMap } from "utils";

const TableHeaderDiv = styled('div')({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "center",
});

const ClickableIcon = styled('div')({
  cursor: "pointer",
});

const WebhookTableHeaders = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.fieldsReducer);
  const { itemsPerPage, pageNum, activeCoin: coin } = useSelector(
    (state) => state.pageReducer
  );
  const webhooks = useSelector((state) => state.webhookReducer[coin].data);
  const fieldKeys = Object.keys(fields);

  const [selected, setSelected] = useState(false);

  const sort = (key, order) => {
    let sortedData = createSortedKeyMap(webhooks, key, order);
    dispatch(setWebhookData({ coin, data: sortedData }));
  };

  const onSelect = () => {
    let start = (pageNum - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let webhookKeys = Object.keys(webhooks);
    let data = {};
    for (let i = start; i < end; i++) {
      let key = webhookKeys[i];
      if (!key) break; //out of bounds error
      data[key] = !selected;
    }
    dispatch(markWebhooks(data));
    setSelected(!selected);
  };

  return (
    <TableHead data-testid="webhook-table-head">
      <TableRow data-testid="webhook-table-header-row">
        <StyledTableCell align="center" key={"checked"} data-testid="webhook-table-header-checkbox-cell">
          <WhiteCheckBox 
            checked={selected} 
            onChange={onSelect} 
            data-testid="webhook-table-header-select-all-checkbox"
          />
        </StyledTableCell>
        {fieldKeys.map((key) => {
          let field = fields[key];
          if (field.checked) {
            return (
              <StyledTableCell 
                align="center" 
                key={field.key} 
                data-testid={`webhook-table-header-${field.key}`}
              >
                <TableHeaderDiv data-testid={`webhook-table-header-${field.key}-container`}>
                  <ClickableIcon 
                    as={ArrowDropUpIcon}
                    onClick={(event) => sort(field.key, "asc", event)}
                    data-testid={`webhook-table-header-${field.key}-sort-asc`}
                  />
                  {field.name}
                  <ClickableIcon 
                    as={ArrowDropDownIcon}
                    onClick={(event) => sort(field.key, "desc", event)}
                    data-testid={`webhook-table-header-${field.key}-sort-desc`}
                  />
                </TableHeaderDiv>
              </StyledTableCell>
            );
          } else {
            return <></>;
          }
        })}
        <StyledTableCell align="center" key={"options"} data-testid="webhook-table-header-options">
          Options
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default WebhookTableHeaders;
