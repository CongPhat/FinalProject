import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavAdminstator extends Component {
  render() {
    return (
      <div className="col-md-4 nav-admin">
          <ul>
              <li>
                <Link to='/adminstrator'>DashBoard</Link>
              </li>
              <li>
                <Link to='/adminstator/add-new-products'>AddProducts</Link>
              </li>
          </ul>
      </div>
    );
  }
}

export default NavAdminstator;
