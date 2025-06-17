import React from "react";

import { TOKEN } from "_config/blockcypher";

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

export default Header;
