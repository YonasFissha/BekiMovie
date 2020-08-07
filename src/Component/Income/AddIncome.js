import React, { useState, Component } from "react";
import { useFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { isEmpty, isLoaded, firestoreConnect } from "react-redux-firebase";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
class Addincome extends Component {
  state = {
    Date: "",
    movieIncome: "",
    cardIncome: "",
    softwareIncome: "",
    Expense: "",
    Description: "",
    showSpinner: false,
  };
  addIncome = (e) => {
    e.preventDefault();
    this.setState({
      showSpinner: true,
    });
    const {
      Date,
      movieIncome,
      cardIncome,
      softwareIncome,
      Expense,
      Description,
    } = this.state;
    const sampleIncome = {
      Date,
      movieIncome,
      cardIncome,
      softwareIncome,
      Expense,
      Description,
    };
    const { firestore } = this.props;
    firestore
      .add("IncomeRecords", sampleIncome)
      .then((err) => this.props.history.push("/"));
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      Date,
      movieIncome,
      cardIncome,
      softwareIncome,
      Expense,
      Description,
      showSpinner,
    } = this.state;
    return (
      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-10">
          <Link to="/" className="mb-2">
            <i className="fas fa-arrow-circle-left mr-1"></i>Back to Dashboard
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
                  <label htmlFor="Income">Movie Income</label>
                  <input
                    type="number"
                    name="movieIncome"
                    value={movieIncome}
                    onChange={this.onChange}
                    className="form-control"
                    required
                  />
                </div>
                <div class="form-group ">
                  <label htmlFor="Type">Card Income</label>
                  <input
                    type="number"
                    name="cardIncome"
                    value={cardIncome}
                    onChange={this.onChange}
                    className="form-control"
                    required
                  />
                </div>
                <div class="form-group ">
                  <label htmlFor="Type">Software Income</label>
                  <input
                    type="number"
                    name="softwareIncome"
                    value={softwareIncome}
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
                  <label htmlFor="Expense">Description</label>
                  <textarea
                    type="text"
                    rows="4"
                    name="Description"
                    value={Description}
                    onChange={this.onChange}
                    className="form-control"
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="Balance">Balance</label>
                  <input
                    type="number"
                    name="Balance"
                    value={Balance}
                    onChange={this.onChange}
                    className="form-control"
                    required
                  />
                </div> */}

                <button className="btn btn-primary">
                  Add Income{" "}
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
Addincome.propTypes = {
  firestore: PropTypes.object.isRequired,
};
export default firestoreConnect()(Addincome);
