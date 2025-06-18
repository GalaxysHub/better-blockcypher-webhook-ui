import React from "react";
import { useDispatch, useSelector } from "react-redux"; 

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Switch from "@mui/material/Switch";

import { setLightTheme, setDarkTheme } from "store/slices";

const StyledDiv = styled("div")(({ theme }) => ({
  flexGrow: 1,
  zIndex: 99,
  position: "sticky",
  top: "0",
  width: "100%",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  background: theme.palette.primary?.[theme.mode] || theme.palette.primary.main,
  display: "flex",
  justifyContent: "space-between",
  height: "100% !important",
}));

const NavlinkContainer = styled(Grid)({
  display: "flex",
});

const SwitchContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

function Navbar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.themeReducer.mode);

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (mode === "light") {
      dispatch(setDarkTheme());
    } else {
      dispatch(setLightTheme());
    }
  };

  return (
    <StyledDiv data-testid="navbar-root">
      <AppBar position="static" data-testid="navbar-appbar">
        <StyledToolbar data-testid="navbar-toolbar">
          <Grid justify="space-between" container data-testid="navbar-grid">
            <NavlinkContainer item data-testid="navbar-links"></NavlinkContainer>
            <Grid data-testid="navbar-theme-switch-grid">
              <SwitchContainer data-testid="navbar-switch-container">
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  data-testid="navbar-theme-switch"
                  inputProps={{ "aria-label": "theme toggle switch" }}
                />
              </SwitchContainer>
            </Grid>
          </Grid>
        </StyledToolbar>
      </AppBar>
    </StyledDiv>
  );
}

export default Navbar;
