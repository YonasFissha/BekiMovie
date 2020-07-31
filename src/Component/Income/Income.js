import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Spinner from "../Layout/spinner";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { isEmpty, isLoaded, firestoreConnect } from "react-redux-firebase";

class Income extends Component {
  state = {
    totalIncome: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { Incomes } = props;
    if (Incomes) {
      const total = Incomes.reduce((total, income) => {
        return (
          total +
          parseFloat(income.Income.toString()) -
          parseFloat(income.Expense.toString())
        );
      }, 0);
      return { totalIncome: total };
    }

    return null;
  }
  render() {
    const { Incomes } = this.props;
    const { totalIncome } = this.state;

    if (!isLoaded(Incomes)) {
      return <Spinner></Spinner>;
    }

    if (isEmpty(Incomes)) {
      return <div>Income List Is Empty</div>;
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-6">
              <h4>
                <i className="fas fa-file-invoice-dollar mr-2"></i>Income List
                <span className="badge badge-secondary m-2">
                  {Incomes.length}
                </span>{" "}
              </h4>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <h6 className="text-center text-secondary">
                    Total:{""}
                    <span className="text-primary">
                      {""} ${parseFloat(totalIncome).toFixed(2)}
                    </span>
                  </h6>
                </div>
                <div className="col-6">
                  <Sidebar></Sidebar>
                </div>
              </div>
            </div>
          </div>
          <table className="table table-striped table-sm mt-3">
            <thead className="thread-inverse">
              <tr>
                <th>Date</th>
                <th>Income</th>
                <th>Expense</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Incomes.map((income) => (
                <tr key={income.id}>
                  <td>{income.Date}</td>
                  <td>${parseFloat(income.Income).toFixed(2)}</td>
                  <td> ${parseFloat(income.Expense).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/incomes/${income.id}`}
                      className="btn btn-sm btn-secondary"
                    >
                      <i className="fas fa-arrow-circle-right mr-2"></i>
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

Income.propTypes = {
  firestore: PropTypes.object.isRequired,
  Incomes: PropTypes.array,
};

export default compose(
  firestoreConnect([
    {
      collection: "IncomeRecords",
    },
  ]),
  connect((state, props) => ({
    Incomes: state.firestore.ordered.IncomeRecords,
  }))
)(Income);
