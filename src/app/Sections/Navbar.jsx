import React from "react";
import { useDispatch, useSelector } from "react-redux"; 

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { setLightTheme, setDarkTheme } from "store/slices";

const StyledDiv = styled("div")(({ theme }) => ({
  zIndex: 99,
  position: "sticky",
  top: "0",
  width: "100%",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  background: theme.palette.gradient.header[theme.mode],
  color: theme.palette.primary.contrastText,
  display: "flex",
  justifyContent: "space-between",
  minHeight: "64px !important",
  paddingLeft: "28px !important",
  paddingRight: "28px !important",
  [theme.breakpoints.down("sm")]: {
    minHeight: "56px !important",
    paddingLeft: "16px !important",
    paddingRight: "16px !important",
  },
}));

const SwitchContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Brand = styled(Typography)({
  fontSize: "16px",
  fontWeight: 800,
  letterSpacing: 0,
});

function Navbar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.themeReducer.mode);

  const handleChange = () => {
    if (mode === "light") {
      dispatch(setDarkTheme());
    } else {
      dispatch(setLightTheme());
    }
  };

  return (
    <StyledDiv>
      <AppBar position="static" elevation={0}>
        <StyledToolbar>
          <Brand component="div">BlockCypher Webhooks</Brand>
          <SwitchContainer>
            <Switch
              checked={mode === "dark"}
              onChange={handleChange}
              color="primary"
              name="theme"
              data-testid="theme-switch"
              slotProps={{
                input: { "aria-label": "theme toggle switch" }
              }}
            />
          </SwitchContainer>
        </StyledToolbar>
      </AppBar>
    </StyledDiv>
  );
}

export default Navbar;
