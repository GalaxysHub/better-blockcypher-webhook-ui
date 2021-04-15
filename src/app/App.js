import "styles/App.css";
import Header from "./Sections/Header";
import CoinTabs from "./Sections/CoinTabs";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
}));

toast.configure();

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
