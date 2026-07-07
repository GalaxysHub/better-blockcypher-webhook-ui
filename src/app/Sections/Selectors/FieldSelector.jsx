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
  fontSize: "13px",
  fontWeight: 800,
  color: theme.palette.primary.contrastText,
  background: theme.palette.gradient.headerSoft[theme.mode],
  padding: "12px 16px",
  textTransform: "uppercase",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  overflow: "hidden",
  minWidth: 0,
}));

const SelectorContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  minWidth: 0,
  gap: "4px 14px",
  alignItems: "center",
  padding: "0 16px 8px !important",
  marginTop: "8px",
  "& .MuiFormControlLabel-root": {
    marginLeft: -4,
    marginRight: 0,
  },
  "& .MuiFormControlLabel-label": {
    color: theme.palette.text.primary,
    fontSize: 14,
  },
}));

const FieldSelector = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.fieldsReducer);
  const fieldKeys = Object.keys(fields);

  return (
    <FormControl component="fieldset" fullWidth>
      <StyledPaper elevation={0}>
        <Header>Filter Fields</Header>
        <SelectorContainer maxWidth={false}>
          {fieldKeys.map((key) => {
            let field = fields[key];
            return (
              <FormControlLabel
                key={field.key}
                control={
                  <CustomCheckBox
                    name={field.key}
                    checked={field.checked}
                    onChange={(event) => dispatch(selectField(key))}
                    data-testid={`field-checkbox-${field.key}`}
                  />
                }
                label={field.name}
              />
            );
          })}
        </SelectorContainer>
        <PageSelector />
      </StyledPaper>
    </FormControl>
  );
};

export default FieldSelector;
