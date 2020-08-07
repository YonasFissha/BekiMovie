import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div>
      <Link to="/income/addincome" className="btn btn-info btn-sm float-right">
        <i className="fas fa-plus ml-2 mr-2"></i>Add
      </Link>
    </div>
  );
}
export default Sidebar;
