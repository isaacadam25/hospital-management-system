import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
      <div className="container-fluid">
        <Switch>
            <Route path="/auth" component={() => <Login />} />
            <Route path="/hospital" component={() => <Home />} />
            <Redirect from="/" to="/auth" />
        </Switch>
      </div>
  );
}

export default App;
