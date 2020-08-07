import React, { useState, Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import Spinner from "../Layout/spinner";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
class EditIncome extends Component {
  constructor(props) {
    super(props);

    this.dateInput = React.createRef();
    this.movieIncomeInput = React.createRef();
    this.cardIncomeInput = React.createRef();
    this.softwareIncomeInput = React.createRef();
    this.expenseInput = React.createRef();
    this.descriptionInput = React.createRef();
  }

  addIncome = (e) => {
    e.preventDefault();
    const { firestore, history, income } = this.props;
    const sampleIncome = {
      Date: this.dateInput.current.value,
      movieIncome: this.movieIncomeInput.current.value,
      cardIncome: this.cardIncomeInput.current.value,
      softwareIncome: this.softwareIncomeInput.current.value,
      Expense: this.expenseInput.current.value,
      Description: this.descriptionInput.current.value,
    };

    firestore
      .update({ collection: "IncomeRecords", doc: income.id }, sampleIncome)
      .then(history.push("/"));
  };

  render() {
    const { income } = this.props;
    if (income) {
      return (
        <div className="row justify-content-center">
          <div className="col-md-8 col-sm-10">
            <Link to="/" className="mb-2">
              <i className="fas fa-arrow-circle-left mr-1"></i>Back to Dashboard
            </Link>
            <div className="card mt-2">
              <div className="card-header">Update Income</div>
              <div className="card-body">
                <form action="" onSubmit={this.addIncome}>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="Date"
                      name="Date"
                      ref={this.dateInput}
                      defaultValue={income.Date}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Income">Movie Income</label>
                    <input
                      type="number"
                      name="movieIncome"
                      ref={this.movieIncomeInput}
                      defaultValue={income.movieIncome}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Income">Card Income</label>
                    <input
                      type="number"
                      name="cardIncome"
                      ref={this.cardIncomeInput}
                      defaultValue={income.cardIncome}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Income">Income</label>
                    <input
                      type="number"
                      name="softwareIncome"
                      ref={this.softwareIncomeInput}
                      defaultValue={income.softwareIncome}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Expense">Expense</label>
                    <input
                      type="number"
                      name="Expense"
                      ref={this.expenseInput}
                      defaultValue={income.Expense}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Balance">Desciption</label>
                    <textarea
                      type="textarea"
                      name="Description"
                      rows="4"
                      ref={this.descriptionInput}
                      defaultValue={income.Description}
                      className="form-control"
                    />
                  </div>
                  <button className="btn btn-primary">Update Income</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner></Spinner>;
    }
  }
}
export default compose(
  firestoreConnect((props) => [
    {
      collection: "IncomeRecords",
      storeAs: "income",
      doc: props.match.params.id,
    },
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    income: ordered.income && ordered.income[0],
  }))
)(EditIncome);
