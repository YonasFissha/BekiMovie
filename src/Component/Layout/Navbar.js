import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
class Navbar extends Component {
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
  onLogOutClick = (e) => {
    e.preventDefault();
    const { firebase, history } = this.props;
    firebase.logout();
  };
  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-info mb-4">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand"
            style={{ fontFamily: "Segoe UI Black" }}
          >
            BEKI MOVIES
          </Link>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {isAuthenticated ? (
                <Link to="/setting" className="nav-link">
                  Setting
                </Link>
              ) : null}
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <a href="#!" className="nav-link" onClick={this.onLogOutClick}>
                  Logout
                </a>
              ) : null}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
  }))
)(Navbar);
