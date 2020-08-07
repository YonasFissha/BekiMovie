import React, { Component } from "react";
import Income from "../Income/Income";
import Sidebar from "./Sidebar";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
class Dashboard extends Component {
  state = {
    isAuthenticated: false,
  };
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col">
            <p className="display-6 text-secondary ">Dashboard</p>
          </div>
          <div className="col">
            <p className="display-6 text-secondary float-right">{auth.email}</p>
          </div>
        </div>

        <Income></Income>

        <footer class="page-footer font-small blue mt-3">
          <div class="footer-copyright text-center py-3">
            © 2020 Copyright:
            <a href="https://mdbootstrap.com/"> BekiMovies.com</a>
          </div>
        </footer>
      </div>
    );
  }
}
export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
  }))
)(Dashboard);
