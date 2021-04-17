import React from "react";
import { connect, useSelector } from "react-redux";

import { TOKEN } from "config/blockcypher";

const Header = () => {
  const renderTokenLimits = () => {
    return (
      <div>
        <h5>Limits</h5>
      </div>
    );
  };

  return (
    <div>
      <h3>Active Webhooks for Token {TOKEN}</h3>
    </div>
  );
};

export default connect()(Header);
