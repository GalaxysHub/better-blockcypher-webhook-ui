import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: "10px",
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    color: theme.palette.text[theme.mode],
    backgroundColor: theme.palette.green[theme.mode],
    border: "2px solid green",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: "10px",
    margin: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  icon: {},
  content: {
    flexGrow: 0,
    "&$expanded": {
      padding: "12px 0",
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey.ghost[theme.mode],
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text[theme.mode],
  },
}));

const AccordionComp = ({ title, children }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion
      square
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={classes.icon} />}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionComp;
