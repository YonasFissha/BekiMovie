import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Spinner from "../Layout/spinner";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { isEmpty, isLoaded, firestoreConnect } from "react-redux-firebase";
import IncomeAnalysis from "../Layout/IncomeAnalysis";

class Income extends Component {
  state = {
    totalIncome: null,
    totalExpense: null,
    NumberOfDays: null,
    movieIncome: null,
    cardIncome: null,
    softwareIncome: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { Incomes } = props;
    if (Incomes) {
      const total = Incomes.reduce((total, income) => {
        return (
          total +
          parseFloat(income.movieIncome.toString()) +
          parseFloat(income.cardIncome.toString()) +
          parseFloat(income.softwareIncome.toString()) -
          parseFloat(income.Expense.toString())
        );
      }, 0);
      const totalExpense = Incomes.reduce((total, income) => {
        return total + parseFloat(income.Expense.toString());
      }, 0);
      const NumberOfDays = Incomes.reduce((total, income) => {
        return total + 1;
      }, 0);
      const movieIncome = Incomes.reduce((total, income) => {
        return total + parseFloat(income.movieIncome.toString());
      }, 0);
      const cardIncome = Incomes.reduce((total, income) => {
        return total + parseFloat(income.cardIncome.toString());
      }, 0);
      const softwareIncome = Incomes.reduce((total, income) => {
        return total + parseFloat(income.softwareIncome.toString());
      }, 0);

      return {
        totalExpense: totalExpense,
        totalIncome: total,
        NumberOfDays: NumberOfDays,
        movieIncome: movieIncome,
        cardIncome: cardIncome,
        softwareIncome: softwareIncome,
      };
    }

    return null;
  }
  render() {
    const { Incomes } = this.props;
    const {
      totalIncome,
      totalExpense,
      NumberOfDays,
      movieIncome,
      cardIncome,
      softwareIncome,
    } = this.state;

    if (!isLoaded(Incomes)) {
      return <Spinner></Spinner>;
    }

    if (isEmpty(Incomes)) {
      return (
        <div>
          Income List Is Empty
          <div className="col-6">
            <Sidebar></Sidebar>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <IncomeAnalysis
            Income={totalIncome}
            Expense={totalExpense}
            numberofDays={NumberOfDays}
            movieIncome={movieIncome}
            cardIncome={cardIncome}
            softwareIncome={softwareIncome}
          ></IncomeAnalysis>
          <div className="row justify-content-center mt-4">
            <div className="col">
              <p className="display-5 float-left text-secondary">
                {/* <i className="fas fa-file-invoice-dollar mr-2 text-secondary"></i> */}
                Income List
              </p>
            </div>
            <div className="col">
              <Link
                to="/income/addincome"
                className="btn btn-info btn-sm float-right"
              >
                <i className="fas fa-plus ml-2 mr-2"></i>Add
              </Link>
            </div>
          </div>
          <div className="row bg-light border-0">
            <table
              id="dtBasicExample"
              className="table table-striped table-bordered table-sm mr-3 ml-3 mb-3 shadow"
            >
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
                    <td>
                      $
                      {(
                        parseFloat(income.movieIncome) +
                        parseFloat(income.cardIncome) +
                        parseFloat(income.softwareIncome)
                      ).toFixed(2)}
                    </td>
                    <td> ${parseFloat(income.Expense).toFixed(2)}</td>
                    <td className="text-center">
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
