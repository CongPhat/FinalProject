import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className='container'>
          <div className='footer__inner'>
            <div className='row'>
              <div className='col-md-4 footer__block footer__block--links'>
                <div className='footer__block--title'>
                  <h5>store information</h5>
                </div>
                <div className='footer__block__main'>
                  <ul>
                    <li>
                      <Link to='/'>About Us</Link>
                    </li>
                    <li>
                      <Link to='/'>Branch Store</Link>
                    </li>
                    <li>
                      <Link to='/'>Form Of Carriage</Link>
                    </li>
                    <li>
                      <Link to='/'>Return policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-md-4 footer__block footer__block--text'>
                <div className='footer__block--title'>
                  <h5>store branch</h5>
                </div>
                <div className='footer__block__main'>
                  <div className='footer__block__main--group'>
                    <strong>Branch 1: </strong>
                    <span>Road No. 2, Ho Chi Minh City</span>
                  </div>
                  <div className='footer__block__main--group'>
                    <strong>Branch 2: </strong>
                    <span>Road No. 5, Ho Chi Minh City</span>
                  </div>
                  <div className='footer__block__main--group'>
                    <strong>Branch 3: </strong>
                    <span>Road No. 9, Ho Chi Minh City</span>
                  </div>
                  <div className='footer__block__main--group'>
                    <strong>Branch 4: </strong>
                    <span>Road No. 10, Ho Chi Minh City</span>
                  </div>
                </div>
              </div>
              <div className='col-md-4 footer__block footer__block--text'>
                <div className='footer__block--title'>
                  <h5>about us</h5>
                </div>
                <div className='footer__block__main'>
                  <span className='footer__block__main--intro'>
                    Swallows is Vietnam fashion brand, our mission is to create products with high quality standards, perfect in every smallest detail.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
