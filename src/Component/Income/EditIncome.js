import React, { useState, Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import Spinner from "../Layout/spinner";
import { firestoreConnect } from "react-redux-firebase";
class EditIncome extends Component {
  constructor(props) {
    super(props);

    this.dateInput = React.createRef();
    this.incomeInput = React.createRef();
    this.expenseInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  addIncome = (e) => {
    e.preventDefault();
    const { firestore, history, income } = this.props;
    const sampleIncome = {
      Date: this.dateInput.current.value,
      Income: this.incomeInput.current.value,
      Expense: this.expenseInput.current.value,
      Balance: this.balanceInput.current.value,
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
            <div className="card">
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
                    <label htmlFor="Income">Income</label>
                    <input
                      type="number"
                      name="Income"
                      ref={this.incomeInput}
                      defaultValue={income.Income}
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
                    <label htmlFor="Balance">Balance</label>
                    <input
                      type="number"
                      name="Balance"
                      ref={this.balanceInput}
                      defaultValue={income.Balance}
                      className="form-control"
                      required
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
