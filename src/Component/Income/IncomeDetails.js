import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Spinner from "../Layout/spinner";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  isEmpty,
  isLoaded,
  firestoreConnect,
  firebaseConnect,
} from "react-redux-firebase";

class IncomeDetails extends Component {
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  onDeleteClick = () => {
    const { income, firestore, history } = this.props;

    firestore
      .delete({
        collection: "IncomeRecords",
        doc: income.id,
      })
      .then(history.push("/"));
  };
  render() {
    const { income } = this.props;
    if (income) {
      return (
        <div>
          <div className="row mb-2">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left mr-1"></i>
                Back to Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link
                  to={`/income/editincome/${income.id}`}
                  className="btn btn-dark btn-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={this.onDeleteClick}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h5>
                <span className="text-secondary"> Date: {income.Date}</span>
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <div>
                    <h6>
                      <span className="text-secondary">Income:</span> $
                      <span
                        className={classnames({
                          "text-danger": income.Income < 20,
                          "text-warning":
                            income.Income > 20 && income.Income < 50,
                          "text-success": income.Income > 49,
                        })}
                      >
                        {this.formatNumber(
                          parseFloat(income.Income).toFixed(2)
                        )}
                      </span>
                    </h6>
                  </div>
                </li>
                <li className="list-group-item">
                  <div>
                    <h6>
                      <span className="text-secondary">Expense:</span> $
                      {this.formatNumber(parseFloat(income.Expense).toFixed(2))}
                    </h6>
                  </div>
                </li>
                <li className="list-group-item">
                  <div>
                    <h6>
                      <span className="text-secondary">Balance: </span>$
                      {this.formatNumber(parseFloat(income.Balance).toFixed(2))}
                    </h6>
                  </div>
                </li>
              </ul>
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
)(IncomeDetails);
