import "rsuite/dist/styles/rsuite-default.css";
import "./Style/main.scss";
import { Switch } from "react-router";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Privateroute from "./Components/Privateroute";
import Publicroute from "./Components/Publicroute";
function App() {
  return (
    <div className="App">
      <Switch>
        {/* <route path="/signin">
          <SignIn />
        </route> */}

        <Publicroute path="/signin">
          <SignIn />
        </Publicroute>
        <Privateroute>
          <Home />
        </Privateroute>
      </Switch>
    </div>
  );
}

export default App;
