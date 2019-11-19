import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MostPurchasedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostPurchasedProduct: {}
    }
  }
  UNSAFE_componentWillMount() {
    axios({
		  method: 'get',
      url: 'http://localhost:4000/server/most-purchased-product.php',
		  contentType: "application/json; charset=utf-8",
		  dataType: "json",
		}).then( res => {
      this.setState({mostPurchasedProduct: res.data});
		});
  }

  render() {
    let { NameProduct, avata, Price, color, size } = this.state.mostPurchasedProduct;
    return (
      <div className="mpproducts">
        <div className='container'>
          <div className='mpproducts__main'>
            <div className='title__page--home'>
              <h6 className='title__page--home__sub'>Collection</h6>
              <h4 className='title__page--home__main'>Most Purchased Product</h4>
            </div>
            <div className='mpproducts__main__item'>
              <div className='row'>
                <div className='col-md-6 mpproducts__main__item--image'>
                  <img src={avata} alt={NameProduct}/>
                </div>
                <div className='col-md-6 mpproducts__main__item--infor'>
                  <div className='products__meta'>
                    <h2 className='name'>{NameProduct}</h2>
                    <span className='price'>{Price}</span>
                    <span className='color'>Color: {color}</span>
                    <span className='size'>Size: {size}</span>
                  </div>
                  <Link to={`/product/${NameProduct}`}>
                    <button className="btn-page" type="submit">
                      <span>product details</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MostPurchasedProducts;
