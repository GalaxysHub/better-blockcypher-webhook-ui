import React from "react";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeaderContainer = styled(Box)({
  marginBottom: "24px",
});

const Header = () => {
  const token = useSelector((state) => state.tokenReducer.token);
  
  return (
    <HeaderContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        {token.length  ? (
          `Active Webhooks for Token ${token.slice(0, 8)}...`
        ) : (
          "No Token Found. Using Mock Data"
        )}
      </Typography>
    </HeaderContainer>
  );
};

export default Header;
