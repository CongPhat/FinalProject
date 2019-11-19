import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';

import NavAdminstator from './components/NavAdmin/nav-admin';
import DashboardAdmin from './components/Dashboard/dashboard';
import AddNewProducts from './components/Dashboard/add-new-products';


class AdminStrator extends Component {

  UNSAFE_componentWillMount() {
    console.log(this.props.accountEmployees);
  }

  render() {
    return (
      <section className="home-admin">
        <div className='container'>
          <div className='home-admin--title'>
            <h5>Dashboard</h5>
          </div>
          <div className='home-admin__main'>
            <div className='row'>
              <NavAdminstator />

              <Route path='/adminstrator' exact component={DashboardAdmin}/>
              <Route path='/adminstator/add-new-products' component={AddNewProducts}/>

            </div>
          </div>
        </div>
      </section>
    );
  }
}

// function mapStateToProps(state) {
//   return { state1: state}
// }

// export default connect(mapStateToProps)(HomeEmployees);
export default AdminStrator;

