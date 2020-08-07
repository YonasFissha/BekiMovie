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
import Login from "./Component/auth/Login";
import Setting from "./Component/Setting/Setting";
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
} from "./Helpers/authHelper";
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
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                ></Route>
                <Route
                  exact
                  path="/income/addincome"
                  component={UserIsAuthenticated(AddIncome)}
                ></Route>
                <Route
                  exact
                  path="/income/editincome/:id"
                  component={UserIsAuthenticated(EditIncome)}
                ></Route>
                <Route
                  exact
                  path="/incomes/:id"
                  component={UserIsAuthenticated(IncomeDetails)}
                ></Route>
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                ></Route>
                <Route
                  exact
                  path="/setting"
                  component={UserIsAuthenticated(Setting)}
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
