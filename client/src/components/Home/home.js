import React, { Component } from 'react';

import ShopHome from './shop-home';
import HotProducts from './hot-products';
import MostPurchasedProducts from './most-purchased-products';

class Home extends Component {
  render() {
    return (
      <section className='home' data-home>
        <HotProducts />
        <ShopHome />
        <MostPurchasedProducts />
      </section>
    );
  }
}

export default Home;
