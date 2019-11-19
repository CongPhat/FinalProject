import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BannerItem extends Component {
  render() {
    return (
      <div className="index__banner">
        <div className='row'>
          <div className='col-md-4 index__banner__item'>
            <Link to={{
              pathname: '/product-category/shirt',
              refreshPageProduct: true
            }} alt='shirt'
              className='col-md-4 index__banner__direc'>
              <div className='index__banner--main'>
                <img src='/assets/images/aosomi.jpg' alt='Table'/>
                <div className='index__banner--content'>
                  <h3 className='name'>Shirt</h3>
                  <p className='des'>Set the table, share the memories.</p>
              </div>
              </div>
            </Link>
          </div>
          <div className='col-md-4 index__banner__item'>
            <Link to={{
                pathname: '/product-category/t-shirt',
                refreshPageProduct: true
              }} alt='t-shirt'
                className='col-md-4 index__banner__direc'>
              <div className='index__banner--main'>
                <img src='/assets/images/quantay.jpg' alt='Wall'/>
                <div className='index__banner--content'>
                  <h3 className='name'>T-Shirt</h3>
                  <p className='des'>Put up the right kind of walls.</p>
              </div>
              </div>
            </Link>
          </div>
          <div className='col-md-4 index__banner__item'>
            <Link to={{
                pathname: '/product-category/jeans',
                refreshPageProduct: true
              }} alt='jeans'
                className='col-md-4 index__banner__direc'>
              <div className='index__banner--main'>
                <img src='/assets/images/quanjean.jpg' alt='Floor'/>
                <div className='index__banner--content'>
                  <h3 className='name'>Jeans</h3>
                  <p className='des'>Look at your toes.</p>
              </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BannerItem;
