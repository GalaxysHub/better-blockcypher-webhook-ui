import "styles/App.css";
import Header from "./Sections/Header";
import CoinTabs from "./Sections/CoinTabs";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={["App", classes.root].join(" ")}>
      <Container>
        <Header />
        <CoinTabs />
      </Container>
    </div>
  );
}

export default App;
