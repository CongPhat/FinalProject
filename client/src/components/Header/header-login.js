import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import HeaderAccountLogin from './header-account-login';
import HeaderMenu from './header-menu';

class HeaderLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMenu : false,
      statusAccountHeader: false
    }
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({statusAccountHeader: false});
    this.setState({statusMenu: false});
  }

  recieveAccount = (Account) => {
    this.props.requireAccountApp(Account);
  }

  recieveAccountLogout = (status) => {
    this.props.waitLogoutAccount(status);
  }


  openAccountHeader = () => {
    this.setState({statusAccountHeader: true});
    this.setState({statusMenu: false});
  }

  toggleMenuHeader = () => {
    this.setState({statusMenu: !this.state.statusMenu});
    this.setState({statusAccountHeader: false});
  }

  render() {
    let { nameAccountLogin, totalProductsCart } = this.props;
    let { statusMenu, statusAccountHeader } = this.state;

    return (
      <header className='header'>
        <div className='header--top'>
          <div className='header__fill'>
            <div className='header__fill__hamburger' onClick={this.toggleMenuHeader}>
              <div className='header__fill__hamburger--line'>

              </div>
              <div className='header__fill__hamburger--line'>

              </div>
              <div className='header__fill__hamburger--line'>

              </div>
            </div>
          </div>
          <div className='header__logo'>
            <Link to='/'>
              <h2 className='header__logo--trade'>
                SWALLOWS
              </h2>
            </Link>
          </div>
          <div className='header__fill'>
            <div className='header__fill--sub'>
              <div className='header__fill--sub__item'>
                <button type='button'>
                  <FontAwesomeIcon icon={faUserCircle} onClick={this.openAccountHeader}/>
                </button>
              </div>
              <div className='header__fill--sub__item'>
                <Link to='/cart'>
                  <button type='button' className='cart-header'>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    <span>
                      ({ totalProductsCart })
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <HeaderAccountLogin
            requireOpenAccountHeader = {statusAccountHeader}
            nameAccountLogin = {nameAccountLogin}
            requireLogoutAccount = {this.recieveAccountLogout}
            />
        </div>
        <div className='header--bottom'>
          <HeaderMenu requireOpenMenuHeader = {statusMenu}/>
        </div>
      </header>
    );
  }
}

export default HeaderLogin;
