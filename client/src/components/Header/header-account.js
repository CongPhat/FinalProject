import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import onClickOutside from "react-onclickoutside";
import { CSSTransition } from 'react-transition-group';


class HeaderAccount extends Component {
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

  handleClickOutside = (e) => {
    this.setState({statusAccount: false});
  }

  render() {

    let { statusAccount } = this.state;

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
              <Link to='/register' onClick={this.closeAccountHeader}>
                Register
              </Link>
            </div>
            <div className='header__account--bottom__item'>
              <Link to='/login' onClick={this.closeAccountHeader}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default onClickOutside(HeaderAccount);
