import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { allowRegistration } from "../../Actions/settingActions";
class Setting extends Component {
  settingOnChange = () => {
    const { allowRegistration } = this.props;
    allowRegistration();
  };
  render() {
    const { allowRegistration } = this.props.setting;
    return (
      <div>
        <div className="row">
          <div className="card card-block">
            <div className="card-header">Edit Settings</div>
            <div className="card-body">
              <div className="form-control">
                <label>Allow Registration</label>{" "}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  id=""
                  checked={allowRegistration}
                  onChange={this.settingOnChange}
                />
              </div>
              <div className="form-control">
                <label>Allow Registration</label>{" "}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  id=""
                  checked={allowRegistration}
                  onChange={this.settingOnChange}
                />
              </div>
              <div className="form-control">
                <label>Allow Registration</label>{" "}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  id=""
                  checked={allowRegistration}
                  onChange={this.settingOnChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  (state, props) => ({
    setting: state.setting,
  }),
  { allowRegistration }
)(Setting);
