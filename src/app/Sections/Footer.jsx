import React from "react";
import { styled } from "@mui/material/styles";

const StyledFooter = styled("footer")(({ theme }) => ({
  flexGrow: 1,
  textAlign: "center",
  fontSize: "18px",
  color: theme.palette.text?.[theme.mode] || theme.palette.text.primary,
  backgroundColor: theme.palette.primary.main,
  padding: "30px 0px",
}));

const StyledLink = styled("a")({
  color: "aqua",
  textDecoration: "none",
  padding: "10px",
});

export default function Footer() {
  return (
    <StyledFooter data-testid="footer-container">
      <span data-testid="footer-text">Developed By:</span>
      <StyledLink
        href="https://github.com/GalaxysHub/better-blockcypher-webhook-ui"
        data-testid="footer-github-link"
      >
        GalaxysHub
      </StyledLink>
    </StyledFooter>
  );
}
