import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { setToken, setTokenDets, resetAllWebhookData } from "store/slices";
import { getTokenDets } from "APIs/blockcypherWebhooks";
import { toast } from "react-toastify";

const TokenContainer = styled(Box)(({ theme }) => ({
  marginBottom: "16px",
  padding: "16px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "4px",
  backgroundColor: theme.palette.background.paper,
}));

const TokenInputRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  [theme.breakpoints.down('sm')]: {
    flexDirection: "column",
    alignItems: "stretch",
  }
}));

const TokenTextField = styled(TextField)(() => ({
  flexGrow: 1,
}));

const TokenButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: "100%",
  }
}));

const TokenInput = () => {
  const dispatch = useDispatch();
  const currentToken = useSelector((state) => state.tokenReducer.token);
  const [inputToken, setInputToken] = useState(currentToken || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleTokenChange = (event) => {
    setInputToken(event.target.value);
  };

  const handleUpdateToken = async () => {
    const token = inputToken.trim();
    
    setIsLoading(true);
    
    try {
      if (token) {
        // Fetch token details if token is provided
        const response = await getTokenDets(token);
        dispatch(setTokenDets(response.data));
        dispatch(setToken(token));
        // Reset webhook data so fresh data will be fetched with new token
        dispatch(resetAllWebhookData());
        toast.success("Token updated successfully!");
      } else {
        // Clear token details if no token and reset test data
        dispatch(setTokenDets({}));
        dispatch(setToken(null));
        dispatch(resetAllWebhookData());
        toast.info("Token cleared. Using mock data.");
      }
    } catch (error) {
      console.error(`Error validating token ${token}:`, error);
      toast.error(`Failed to validate token ${token}. Please check if the token is correct.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TokenContainer>
      <TokenInputRow>
        <Typography variant="body2" sx={{ minWidth: "120px" }}>
          API Token:
        </Typography>
        <TokenTextField
          value={inputToken}
          onChange={handleTokenChange}
          placeholder="Enter your BlockCypher API token"
          variant="outlined"
          size="small"
          disabled={isLoading}
        />
        <TokenButton
          onClick={handleUpdateToken}
          variant="contained"
          disabled={isLoading || inputToken === (currentToken || "")}
        >
          {isLoading ? "Updating..." : "Update"}
        </TokenButton>
      </TokenInputRow>
    </TokenContainer>
  );
};

export default TokenInput;
