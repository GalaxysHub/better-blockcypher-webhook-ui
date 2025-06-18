import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import { selectField } from "store/slices";

import PageSelector from "app/Sections/Selectors/PageSelector";

import CustomCheckBox from "app/Components/Fields/CustomCheckBox";

const Header = styled('div')(({ theme }) => ({
  borderRadius: "15px 0px 0px 0px",
  fontSize: "16px",
  background: theme.palette.primary[theme.mode],
  color: theme.palette.text[theme.mode],
  padding: "10px",
  borderBottom: "1px solid black",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "15px 0px 15px 0px",
  backgroundColor: theme.palette.grey.light[theme.mode],
}));

const FieldSelector = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.fieldsReducer);
  const fieldKeys = Object.keys(fields);

  return (
    <FormControl component="fieldset" data-testid="field-selector-form-control">
      <StyledPaper elevation={11} data-testid="field-selector-paper">
        <Header data-testid="field-selector-header">Filter Fields</Header>
        <Container data-testid="field-selector-container">
          {fieldKeys.map((key) => {
            let field = fields[key];
            return (
              <FormControlLabel
                key={field.key}
                data-testid={`field-selector-checkbox-label-${field.key}`}
                control={
                  <CustomCheckBox
                    name={field.key}
                    checked={field.checked}
                    onChange={(event) => dispatch(selectField(key))}
                    data-testid={`field-selector-checkbox-${field.key}`}
                  />
                }
                label={field.name}
              />
            );
          })}
        </Container>
        <PageSelector data-testid="field-selector-page-selector" />
      </StyledPaper>
    </FormControl>
  );
};

export default FieldSelector;
