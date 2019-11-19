import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

//Store
import store from './components/Employees/store/store';

import Home from './components/Home/home';
import ProductCategory from './components/Product/product-category';
import Product from './components/Product/product';
import Register from './components/Header/register';
import Header from './components/Header/header';
import HeaderLogin from './components/Header/header-login';
import Login from './components/Header/form-login';
import Cart from './components/Cart/cart';
import CheckOut from './components/Cart/checkout';
import Footer from './components/Footer/footer';

// Employees
import HeaderAdmin from './components/Employees/components/HeaderAdmin/header';
import AdminStrator from './components/Employees/adminstrator';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountLogin : {
        typeAccount: undefined,
        email: '',
        password: ''
      },
      pagiCurrent: 1,
      generalFilter: [],
      productsInTheCart: []
    };
  }

  UNSAFE_componentWillMount() {
  // get Product in cart from localStorage
    let productsInTheCart = localStorage.getItem('productsCart');
    if(productsInTheCart !== null) {
      this.setState({productsInTheCart: JSON.parse(productsInTheCart)});
    }

  // The first account when visiting the site is to get data from localstorage
    let accountLocal = JSON.parse(localStorage.getItem('account'));
    accountLocal !== null && this.setState({accountLogin: accountLocal});
    
    // Check Type Account Admin
    if(accountLocal !== null && accountLocal.typeaccount === 'NV') {
      // this.props.history.push('/adminstrator');
    } else {
      this.props.history.push('/');
    }

  }


  receiveAccount = (account) => {
    this.setState({accountLogin: account});

    setTimeout(() => {
      localStorage.setItem('account', JSON.stringify(account))
    }, 500);
  }

  receiveNPP = (pagiCurrent) => {
    this.setState({pagiCurrent});
  }

  logoutAccount = (signal) => {
    let { accountLogin } = this.state;

    for ( let item in accountLogin) {
      accountLogin[item] = '';
    }

    if(signal === true) {
      this.setState({accountLogin});

      setTimeout(() => {
        localStorage.setItem('account', JSON.stringify(accountLogin));
      }, 500);
    }

  }

  handleGeneralFilter = (generalFilter) => {
    this.setState({generalFilter});
  }

  handleProductAddCart = (productAddToCart) => {
    let { productsInTheCart } = this.state;
    let numberRandom = Math.floor(Math.random() * 10000);

    productAddToCart['idProductInTheCart'] = numberRandom;
    productsInTheCart.push(productAddToCart);
    this.setState({productsInTheCart});

    // save products in the cart into localstorage
    setTimeout(() => {
      localStorage.setItem('productsCart', JSON.stringify(productsInTheCart))
    }, 500);
  }

  handleDelProduct = (itemDel) => {
    let { productsInTheCart } = this.state;

    productsInTheCart = productsInTheCart.filter( (item) => {
      return item.idProductInTheCart !== itemDel.idProductInTheCart
    })

    this.setState({productsInTheCart});

    // save products in the cart into localstorage
    setTimeout(() => {
      localStorage.setItem('productsCart', JSON.stringify(productsInTheCart))
    }, 500);
  }

  handleUpdatePrice = (productUpdatedPrice) => {
    let { productsInTheCart } = this.state;
    productsInTheCart = productsInTheCart.map( (item) => {
      if( item.idProductInTheCart === productUpdatedPrice.idProductInTheCart) {
        return productUpdatedPrice;
      } else return item;
    })

    this.setState({productsInTheCart});

    // save products in the cart into localstorage
    setTimeout(() => {
      localStorage.setItem('productsCart', JSON.stringify(productsInTheCart))
    }, 500);
  }

  render() {
    let { typeaccount, fullname } = this.state.accountLogin;
    let { accountLogin } = this.state;
    let { generalFilter, pagiCurrent, productsInTheCart} = this.state;
    let header;
    let router;
    let footer;

    if ( typeaccount === undefined || typeaccount === '' || typeaccount === 'KH') {
      router = <main>
                <Route path='/' exact component={Home} />
                <Route path='/product-category/:name' render={(props) =>
                    <ProductCategory
                      {...props}
                      requireNPP = {this.receiveNPP}
                      dataValuePagi = {pagiCurrent}
                      sendFilterToApp = {this.handleGeneralFilter}
                      receiveFilterFromApp = {generalFilter}
                      requireProductAddToCartToApp = {this.handleProductAddCart}
                    />}
                />
                <Route path='/product/:nameProduct' render={(props) =>
                    <Product
                      {...props}
                      requireProductAddToCartToApp = {this.handleProductAddCart}
                    />}
                />
                <Route path='/register' children={<Register registerAccount={this.receiveAccount}/>}/>
                <Route path='/login' children={<Login requireAccount={this.receiveAccount}/>}/>
                <Route path='/cart' children={
                  <Cart
                    requireCart = {productsInTheCart}
                    requireDelProductToApp = {this.handleDelProduct}
                    updateProductPrices = {this.handleUpdatePrice}
                  />
                } />
                <Route path='/checkout' children={
                  <CheckOut
                    requireCheckOut = {productsInTheCart}
                    requireAccountCheckOut = {accountLogin}
                    checkoutCart = {productsInTheCart}
                    updateProductPrices = {this.handleUpdatePrice}
                  />
                } />
              </main>;
      if( typeaccount === undefined || typeaccount === '') {
        header = <Header
                    requireAccountApp={this.receiveAccount}
                    totalProductsCart = {productsInTheCart.length}
                  />;
        footer = <Footer />;
      } else {
        header = <HeaderLogin
                  waitLogoutAccount={this.logoutAccount}
                  nameAccountLogin={fullname}
                  totalProductsCart = {productsInTheCart.length}
                />; 

        footer = <Footer />;        
        }

    } else if ( typeaccount === 'NV') {
          header = <HeaderAdmin />;
          
          router = <main>
                      <Provider store={store}>
                        <AdminStrator accountEmployees={accountLogin}/>
                      </Provider>
                  </main>
    }

    return (
      <div className="App">
        <Switch>
          {header}
          {router}
          {footer}
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
