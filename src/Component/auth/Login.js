import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import spinner from "../Layout/spinner";
import { notifyUser } from "../../Actions/notifyAction";
import Alert from "../Layout/Alert";
class Login extends Component {
  state = {
    email: "",
    password: "",
    showSpinner: false,
    showError: false,
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  LoginOnSubmit = (e) => {
    e.preventDefault();
    const { firebase, history, notifyUser } = this.props;
    const { email, password } = this.state;
    this.setState({
      showSpinner: true,
    });
    firebase
      .login({
        email: email,
        password: password,
      })
      .catch(
        (err) =>
          this.setState({
            showSpinner: false,
          }),
        notifyUser("Wrong Password or Email", "error")
      );
  };
  render() {
    const { email, password, showSpinner, showError } = this.state;
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 col-sm-8 mx-auto">
          <div className="card  text-center pb-4 pt-3 ml-3 mr-3">
            {message ? (
              <Alert message={message} messageType={messageType}></Alert>
            ) : null}

            <h2 className="text-center text-primary pb-4 pt-3">
              <i className="fas fa-lock mr-2"></i>Login
            </h2>
            <div className="card-body">
              <form onSubmit={this.LoginOnSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={this.onChange}
                    name="email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={this.onChange}
                    name="password"
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" value="Login" className="btn btn-primary">
                  Login{" "}
                  {showSpinner ? (
                    <div class="spinner-border spinner-border-sm" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : null}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
    }),
    { notifyUser }
  )
)(Login);

