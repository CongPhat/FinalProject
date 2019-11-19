import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from "react-onclickoutside";
import { CSSTransition } from 'react-transition-group';


class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMenu: false
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({statusMenu: nextProps.requireOpenMenuHeader});
  }

  closeMenuHeader = () => {
    this.setState({statusMenu: false});
  }

  handleClickOutside = (e) => {
    this.setState({statusMenu: false});
  }

  render() {
    let { statusMenu } = this.state;
    return (
      <CSSTransition in={statusMenu} timeout={1000} classNames='header__menu'>
        <nav className='header__menu'>
          <ul>
            <li>
              <Link to='/product-category/all' onClick={this.closeMenuHeader}>
                SHOP
              </Link>
            </li>
            <li>
              <Link to='/' onClick={this.closeMenuHeader}>
                BLOG
              </Link>
            </li>
            <li>
              <Link to='/' onClick={this.closeMenuHeader}>
                ABOUT US
              </Link>
            </li>
          </ul>
        </nav>
      </CSSTransition>
    );
  }
}

export default onClickOutside(HeaderMenu);
