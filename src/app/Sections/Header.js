import React from "react";
import { connect } from "react-redux";

import { TOKEN } from "config/blockcypher";

const Header = () => {
  return (
    <div>
      {TOKEN ? (
        <h3>Active Webhooks for Token {TOKEN}</h3>
      ) : (
        <h3>No Token Found. Using Mock Data</h3>
      )}
    </div>
  );
};

export default connect()(Header);
