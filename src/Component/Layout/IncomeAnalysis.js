import React, { Component } from "react";
import classnames from "classnames";
export default class IncomeAnalysis extends Component {
  state = {
    showDetail: false,
  };

  showDetailOnClick = () => {
    this.setState({
      showDetail: !this.state.showDetail,
    });
  };
  render() {
    const {
      Income,
      Expense,
      numberofDays,
      movieIncome,
      cardIncome,
      softwareIncome,
    } = this.props;
    const { showDetail } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm shadow m-1 ">
            <div className="row h-100">
              <div className="col-4 bg-success h-100">
                <p className="display-4 text-center ">
                  <i className="fas fa-file-invoice-dollar text-white"></i>
                </p>
              </div>
              <div className="col-8 bg-white ">
                <div className="row">
                  <div className="col-sm d-inline-block">
                    <p className="text-center ">
                      <small>Total Revenue</small> <br></br>$
                      <strong>
                        {parseFloat(Income).toFixed(2)} <br></br>
                        <i
                          className={classnames("text-primary", {
                            "fas fa-arrow-circle-up": showDetail,
                            "fas fa-arrow-circle-down": !showDetail,
                          })}
                          Style={{ pointer: "cursor" }}
                          onClick={this.showDetailOnClick}
                        ></i>
                      </strong>
                    </p>
                  </div>
                </div>
                {showDetail ? (
                  <div className="row justify-content-center">
                    <div className="col-sm text-center border">
                      <small>
                        <p>Movie ${parseFloat(movieIncome)}</p>
                      </small>
                    </div>
                    <div className="col-sm  text-center border">
                      <small>
                        <p>Card ${parseFloat(cardIncome)}</p>
                      </small>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-sm shadow m-1 ">
            <div className="row h-100">
              <div className="col-4 bg-warning ">
                <p className="display-4 text-center ">
                  <i className="fas fa-shopping-cart text-white text-center"></i>
                </p>
              </div>
              <div className="col-8 bg-white ">
                <p className="text-center">
                  <small>Total Expense</small> <br></br>$
                  <strong>{parseFloat(Expense).toFixed(2)}</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm shadow m-1">
            <div className="row h-100">
              <div className="col-4 bg-secondary">
                <p className="display-4 text-center ">
                  <i className="fas fa-funnel-dollar text-white text-center"></i>
                </p>
              </div>
              <div className="col-8 bg-white ">
                <p className="text-center">
                  <small>Total Profit</small> <br></br>$
                  <strong>
                    {(parseFloat(Income) - parseFloat(Expense)).toFixed(2)}
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm shadow m-1">
            <div className="row h-100">
              <div className="col-4 bg-info ">
                <p className="text-center display-4">
                  <i className="fas fa-calendar-alt text-white"></i>
                </p>
              </div>
              <div className="col-8 bg-white ">
                <p className="text-center">
                  <small># of Days</small> <br></br>
                  <strong>{numberofDays}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
