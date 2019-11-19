import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import onClickOutside from "react-onclickoutside";
import { CSSTransition } from 'react-transition-group';

class HeaderAccountLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusAccount: false
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({statusAccount: nextProps.requireOpenAccountHeader});
  }

  closeAccountHeader = () => {
    this.setState({statusAccount: false});
  }

  logoutAccount = () => {
    this.props.requireLogoutAccount(true);
  }

  handleClickOutside = (e) => {
    this.setState({statusAccount: false});
  }

  render() {
    let { statusAccount } = this.state;
    let { nameAccountLogin } = this.props;

    return (
      <CSSTransition in={statusAccount} appear={true} timeout={1000} classNames='header__account'>
        <div className='header__account'>
          <div className='header__account--top'>
            <div className='header__account--top__close'>
              <button type='button'>
                <FontAwesomeIcon icon={faTimes} onClick={this.closeAccountHeader}/>
              </button>
            </div>
            <div className='header__account--top__title'>
              <h4>Account</h4>
            </div>
          </div>
          <div className='header__account--bottom'>
            <div className='header__account--bottom__item'>
              <Link to={`/${nameAccountLogin}`}>
                {nameAccountLogin}
              </Link>
            </div>
            <div className='header__account--bottom__item'>
              <button type='button' className='btn-page' onClick={this.logoutAccount}>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default onClickOutside(HeaderAccountLogin);
