import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  minWidth: 0,
  overflow: "hidden",
  boxShadow: "none",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.green?.[theme.mode] || theme.palette.green.main,
  border: `1px solid ${theme.palette.green.dark}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: 56,
  padding: "0 18px",
  "&.Mui-expanded": {
    minHeight: 56,
  },
  "& .MuiAccordionSummary-content": {
    alignItems: "center",
    margin: "14px 0",
    "&.Mui-expanded": {
      margin: "14px 0",
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.grey?.ghost?.[theme.mode] || theme.palette.background.paper,
}));

const StyledExpandIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

const AccordionComp = ({ title, children }) => {
  const [expanded, setExpanded] = React.useState();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      data-testid="accordion"
    >
      <AccordionSummary
        expandIcon={<StyledExpandIcon />}
        aria-controls="panel1d-content"
        id="panel1d-header"
        data-testid="accordion-summary"
      >
        <Typography data-testid="accordion-title">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails data-testid="accordion-details">{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionComp;
