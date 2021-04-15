import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import { selectField } from "redux/actions/fieldsActions";

const useStyles = makeStyles((theme) => ({
  header: {
    borderRadius: "15px 0px 0px 0px",
    fontSize: "16px",
    backgroundColor: theme.palette.primary[theme.mode],
    color: theme.palette.text[theme.mode],
    height: "100%",
    padding: "10px",
    borderBottom: "1px solid black",
  },
  paper: {
    borderRadius: "0px 0px 15px 0px",
  },
}));

const FieldSelector = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const fields = useSelector((state) => state.fieldsReducer);
  const fieldKeys = Object.keys(fields);

  return (
    <Paper elevation={11} className={classes.paper}>
      <FormControl component="fieldset">
        <div className={classes.header}>Show Fields</div>
        <Container>
          {fieldKeys.map((key) => {
            let field = fields[key];
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    key={field.key}
                    name={field.name}
                    checked={field.checked}
                    onChange={(event) =>
                      dispatch(selectField(event.target.name))
                    }
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label={field.name}
              />
            );
          })}
        </Container>
      </FormControl>
    </Paper>
  );
};

export default connect()(FieldSelector);
