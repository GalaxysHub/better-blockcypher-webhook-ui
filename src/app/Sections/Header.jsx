import React from "react";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeaderContainer = styled(Box)({
  margin: "6px 0 20px",
});

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.page.text[theme.mode],
  fontSize: "clamp(24px, 4vw, 36px)",
  lineHeight: 1.15,
  margin: 0,
  overflowWrap: "anywhere",
}));

const Header = () => {
  const token = useSelector((state) => state.tokenReducer.token);
  
  return (
    <HeaderContainer>
      <Title variant="h4" component="h1">
        {token && token.length > 0 ? (
          `Active Webhooks for Token ${token.slice(0, 8)}...`
        ) : (
          "No Token Found. Using Mock Data"
        )}
      </Title>
    </HeaderContainer>
  );
};

export default Header;
