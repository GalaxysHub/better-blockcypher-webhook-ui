import React from "react";
import { TOKEN } from "config/blockcypher.js";

export default function Header() {
  return (
    <div>
      <h3>Active Webhooks for Token {TOKEN}</h3>
    </div>
  );
}
