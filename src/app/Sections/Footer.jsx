import React from "react";
import { styled } from "@mui/material/styles";

const StyledFooter = styled("footer")(({ theme }) => ({
  textAlign: "center",
  fontSize: "14px",
  color: theme.palette.text?.[theme.mode] || theme.palette.text.primary,
  backgroundColor: theme.palette.primary.main,
  padding: "18px 16px",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const StyledLink = styled("a")({
  color: "aqua",
  textDecoration: "none",
  fontWeight: 800,
  padding: "0 6px",
  "&:hover": {
    textDecoration: "underline",
  },
});

export default function Footer() {
  return (
    <StyledFooter>
      Developed By:
      <StyledLink
        href="https://github.com/GalaxysHub/better-blockcypher-webhook-ui"
      >
        GalaxysHub
      </StyledLink>
    </StyledFooter>
  );
}
