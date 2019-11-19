import React, { Component } from 'react';
import axios from 'axios';
import Slider from "react-slick";

import ItemHotProducts from './item-hot-products';

class HotProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataHotProducts: []
    }
  }

  UNSAFE_componentWillMount() {
    axios({
		  method: 'post',
      url: 'http://localhost:4000/server/hot-products.php',
      data: {name: 'all'},
		  contentType: "application/json; charset=utf-8",
		  dataType: "json",
		}).then( res => {
      this.setState({dataHotProducts: res.data});
		});
  }

  render() {
    const settingsSlick = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplay: true,
      className: 'hot-products__slick',
      arrows: false,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    };

    let { dataHotProducts } = this.state;

    return (
      <div
        className="hot-products"
        style={
          {width: '90%', margin: 'auto', textAlign: 'center'}
        }
      >
        <div className='title__page--home'>
          <h6 className='title__page--home__sub'>Collection</h6>
          <h4 className='title__page--home__main'>Hot Products</h4>
        </div>
        <Slider {...settingsSlick}>
          { dataHotProducts.map( (item, index) =>
              <ItemHotProducts item={item} key={index} />
            )
          }
        </Slider>
      </div>
    );
  }
}

export default HotProducts;
