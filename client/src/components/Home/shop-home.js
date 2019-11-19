import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BannerItem from './banner-item';

class ShopHome extends Component {
  render() {
    return (
      <div className="home-shopall">
        <div className='title-page'>
          <Link to='/product-category/all' title='Shop All'>SHOP ALL</Link>
        </div>
        <div className='container'>
          <BannerItem />
        </div>
      </div>
    );
  }
}

export default ShopHome;
