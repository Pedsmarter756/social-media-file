import "rsuite/dist/styles/rsuite-default.css";
import "./Style/main.scss";
import "./Style/preloader.scss";
import { Switch } from "react-router";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home/index";
import Privateroute from "./Components/Privateroute";
import Publicroute from "./Components/Publicroute";
// import Preloader from "./Components/Preloader";
import { ProfileProvider } from "./context/profile.context";

function App() {
  return (
    <>
      {/* <Preloader /> */}
      <div className="App">
        <ProfileProvider>
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
        </ProfileProvider>
      </div>
    </>
  );
}

export default App;
