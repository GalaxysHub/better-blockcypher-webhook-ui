import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import StyledTableCell from "app/Components/Tables/StyledTableCell";
import WhiteCheckBox from "app/Components/Fields/WhiteCheckBox";

import { setWebhookData, markWebhooks } from "redux/actions/webhookActions";

import { createSortedKeyMap } from "utils";

const useStyles = makeStyles((theme) => ({
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
}));

const WebhookTableHeaders = () => {
  const classes = useStyles();
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
    <TableHead>
      <TableRow>
        <StyledTableCell align="center" key={"checked"}>
          <WhiteCheckBox checked={selected} onChange={onSelect} />
        </StyledTableCell>
        {fieldKeys.map((key) => {
          let field = fields[key];
          if (field.checked) {
            return (
              <StyledTableCell align="center" key={field.key}>
                <div className={classes.tableHeader}>
                  <ArrowDropUpIcon
                    className={classes.clickAble}
                    onClick={(event) => sort(field.key, "asc", event)}
                  />
                  {field.name}
                  <ArrowDropDownIcon
                    className={classes.clickAble}
                    onClick={(event) => sort(field.key, "desc", event)}
                  />
                </div>
              </StyledTableCell>
            );
          } else {
            return <></>;
          }
        })}
        <StyledTableCell align="center" key={"options"}>
          Options
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default connect()(WebhookTableHeaders);
