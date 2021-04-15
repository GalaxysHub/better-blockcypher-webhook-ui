import React from "react";
import { connect } from "react-redux";
import FieldSelector from "./FieldSelector";
import WebhookDataTable from "./WebhookDataTable";

import PropTypes from "prop-types";

const TableSection = ({ coin }) => {
  return (
    <div>
      <FieldSelector />
      <WebhookDataTable coin={coin} />
    </div>
  );
};

WebhookDataTable.propTypes = {
  coin: PropTypes.string.isRequired,
};

export default connect()(TableSection);
