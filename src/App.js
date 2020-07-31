import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import store, { rrfProps } from "./store";
import Navbar from "./Component/Layout/Navbar";
import Dashboard from "./Component/Layout/Dashboard";
import AddIncome from "./Component/Income/AddIncome";
import EditIncome from "./Component/Income/EditIncome";
import IncomeDetails from "./Component/Income/IncomeDetails";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <div className="App">
            <Navbar></Navbar>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard}></Route>
                <Route
                  exact
                  path="/income/addincome"
                  component={AddIncome}
                ></Route>
                <Route
                  exact
                  path="/income/editincome/:id"
                  component={EditIncome}
                ></Route>
                <Route
                  exact
                  path="/incomes/:id"
                  component={IncomeDetails}
                ></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
