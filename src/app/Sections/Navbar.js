import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";

import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";

import { setLightTheme, setDarkTheme } from "redux/actions/themeActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 99,
    position: "sticky",
    top: "0",
    width: "100%",
  },
  toolbar: {
    background: theme.palette.primary[theme.mode],
    display: "flex",
    justifyContent: "space-between",
    height: "100% !important",
  },
  navlinkContainer: {
    display: "flex",
  },
  switchContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    color: theme.palette.text[theme.mode],
    padding: "10px",
  },
}));

function Navbar() {
  const classes = useStyles();
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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Grid justify="space-between" container>
            <Grid item className={classes.navlinkContainer}></Grid>
            <Grid>
              <div className={classes.switchContainer}>
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect()(Navbar);
