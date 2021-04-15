import React from "react";
import { connect } from "react-redux";
import FieldSelector from "./FieldSelector";
import WebhookDataTable from "./WebhookDataTable";
import PageSelector from "./PageSelector";

import PropTypes from "prop-types";

const TableSection = ({ coin }) => {
  return (
    <div>
      <FieldSelector />
      <PageSelector coin={coin} />
      <WebhookDataTable coin={coin} />
      <PageSelector coin={coin} />
    </div>
  );
};

WebhookDataTable.propTypes = {
  coin: PropTypes.string.isRequired,
};

export default connect()(TableSection);
