import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Header from "./components/Header";
import Destination from "./pages/Destination";
import BusStops from "./pages/BusStops";
import Buses from "./pages/Buses";
import Home from "./pages/Home";
import Operators from "./pages/Operators";
import OperatorStops from "./pages/OperatorStops";
function App() {

  return (
    <div className="App container">
        <Header />
        <Switch>
            <Route path="/auth" exact>
                <Auth />
            </Route>
            <Route path="/destination" exact>
                <Destination />
            </Route>
            <Route path="/bus-stop/:dId" exact>
                <BusStops />
            </Route>
            <Route path="/buses/:dId" exact>
                <Buses />
            </Route>
            <Route path="/operators" exact>
                <Operators />
            </Route>
            <Route path="/op-bs/:bId/:oId" exact>
                <OperatorStops />
            </Route>
            <Route path="/" exact>
                <Home />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
