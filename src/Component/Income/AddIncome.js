import React, { useState, Component } from "react";
import { useFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { isEmpty, isLoaded, firestoreConnect } from "react-redux-firebase";
class Addincome extends Component {
  state = {
    Date: "",
    Income: "",
    Expense: "",
    Balance: "",
  };
  addIncome = (e) => {
    e.preventDefault();
    const { Date, Income, Expense, Balance } = this.state;
    const sampleIncome = {
      Date,
      Income,
      Expense,
      Balance,
    };
    const { firestore } = this.props;
    firestore.add("IncomeRecords", sampleIncome);
    this.props.history.push("/");
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { Date, Income, Expense, Balance } = this.state;
    return (
      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-10">
          <Link to="/" className="mb-2">
            <i className="fas fa-arrow-circle-left"></i>Back to Dashboard
          </Link>
          <div className="card mt-2">
            <div className="card-header">Add Income</div>
            <div className="card-body">
              <form action="" onSubmit={this.addIncome}>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="Date"
                    name="Date"
                    value={Date}
                    onChange={this.onChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Income">Income</label>
                  <input
                    type="number"
                    name="Income"
                    value={Income}
                    onChange={this.onChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Expense">Expense</label>
                  <input
                    type="number"
                    name="Expense"
                    value={Expense}
                    onChange={this.onChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Balance">Balance</label>
                  <input
                    type="number"
                    name="Balance"
                    value={Balance}
                    onChange={this.onChange}
                    className="form-control"
                    required
                  />
                </div>
                <button className="btn btn-primary">Add Income</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Addincome.propTypes = {
  firestore: PropTypes.object.isRequired,
};
export default firestoreConnect()(Addincome);
