import React from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { createSortedKeyMap } from "utils";

import StyledTableCell from "app/Components/Tables/StyledTableCell";

import PropTypes from "prop-types";

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

const WebhookTableHeaders = ({ data, setData }) => {
  const classes = useStyles();
  const fields = useSelector((state) => state.fieldsReducer);
  const fieldKeys = Object.keys(fields);

  const sort = (key, order) => {
    let sortedData = createSortedKeyMap(data, key, order);
    setData(sortedData);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="center"></StyledTableCell>
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
        <StyledTableCell align="center">Options</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

WebhookTableHeaders.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};

export default connect()(WebhookTableHeaders);
