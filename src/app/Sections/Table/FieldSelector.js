import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";

import { selectField } from "redux/actions/fieldsActions";

const FieldSelector = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.fieldsReducer);
  const fieldKeys = Object.keys(fields);

  return (
    <FormControl component="fieldset">
      <Paper>
        {fieldKeys.map((key) => {
          let field = fields[key];
          return (
            <FormControlLabel
              control={
                <Checkbox
                  key={field.key}
                  name={field.name}
                  checked={field.checked}
                  onChange={(event) => dispatch(selectField(event.target.name))}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label={field.name}
            />
          );
        })}
      </Paper>
    </FormControl>
  );
};

export default connect()(FieldSelector);
