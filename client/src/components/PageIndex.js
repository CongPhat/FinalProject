import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';


import Home from './Home/home';
import ProductCategory from './Product/product-category';
import Product from './Product/product';
import Register from './Header/register';
import Header from './Header/header';
import HeaderLogin from './Header/header-login';


class PageIndex extends Component {
  constructor(props) {
    super();
    this.state = {
      typeAccount: ''
    }
  }

  receiveTypeAccount = (Account) => {
    let { typeAccount } = Account;
    this.setState({typeAccount})
  }

  render() {
    let { typeAccount } = this.state;
    let header;
    let router;

    // if (typeAccount === '') {
    //   header = <div><Header requireAccountApp={this.receiveTypeAccount} /><Header requireAccountApp={this.receiveTypeAccount} /></div>;
    // } else if ( typeAccount === 'KH') {
    //   header = <HeaderLogin />;
    // }

    if ( typeAccount === '' || typeAccount === 'KH') {
      router = <main>
                <Route path='/' exact component={Home} />
                <Route path='/product-category/:name' component={ProductCategory} />
                <Route path='/product/:nameProduct' component={Product} />
                <Route path='/register/' component={Register} />
              </main>;
      if( typeAccount === '') {
        header = <Header requireAccountApp={this.receiveTypeAccount} />;
      } else { header = <HeaderLogin />; }

    } else if ( typeAccount === 'NV') {
      header = <HeaderLogin />;
    }

    return (
      <Switch>
        {header}
        {router}
      </Switch>
    );
  }
}

export default PageIndex;
