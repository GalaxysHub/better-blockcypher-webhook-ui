import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = styled(MuiAccordion)({
  border: "1px solid rgba(0, 0, 0, .125)",
  borderRadius: "10px",
});

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  color: theme.palette.text[theme.mode],
  backgroundColor: theme.palette.green?.[theme.mode] || theme.palette.background.default,
  border: "2px solid green",
  borderBottom: "1px solid rgba(0, 0, 0, .125)",
  borderRadius: "10px",
  margin: -1,
  minHeight: 56,
  "&.Mui-expanded": {
    minHeight: 56,
  },
  "& .MuiAccordionSummary-content": {
    flexGrow: 0,
    "&.Mui-expanded": {
      padding: "12px 0",
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey?.ghost?.[theme.mode] || theme.palette.background.paper,
}));

const StyledExpandIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  color: theme.palette.text[theme.mode],
}));

const AccordionComp = ({ title, children }) => {
  const [expanded, setExpanded] = React.useState();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion
      square
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
