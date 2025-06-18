import React from "react";

import { TOKEN } from "_config/blockcypher";

const Header = () => {
  return (
    <div data-testid="header-container">
      {TOKEN ? (
        <h3 data-testid="header-title-with-token">Active Webhooks for Token {TOKEN}</h3>
      ) : (
        <h3 data-testid="header-title-mock-data">No Token Found. Using Mock Data</h3>
      )}
    </div>
  );
};

export default Header;
