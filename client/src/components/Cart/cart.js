import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ItemCart from './item-cart';

class Cart extends Component {
  UNSAFE_componentWillMount() {
    this.updateProductPrices();
  }

  updateProductPrices = () => {
    let { requireCart } = this.props;
    for ( let item of requireCart ) {
      axios({
        method: 'post',
        url: 'http://localhost:4000/server/update-products-cart.php',
        data: {cart: item},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      }).then( res => {
        if (res.data.NameProduct) {
          this.props.updateProductPrices(res.data);
        }
      });
    }
  }

   totalPriceProduct = () => {
    let { requireCart } = this.props;

    let total = requireCart.reduce( (total, item) => {
      let price = parseInt(item.Price);
      return total + price;
    },0)

    return total;
  }

  handleDelProductInTheCart = (itemDel) => {
    this.props.requireDelProductToApp(itemDel);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let { requireCart } = this.props;
    let bodyCart;
    let total = this.totalPriceProduct();
    requireCart.length === 0 ?
      bodyCart =
        <div className='container'>
          <div className='cart__main'>
            <div className='cart__noitem'>
              <h3>No Item</h3>
              <h6>Please return to the store to select the product you like</h6>
              <Link to='/product-category/all'>
                <button type='button' className='btn-page' >
                  <span>Back to product page.</span>
                </button>
              </Link>
            </div>
          </div>
        </div> :
      bodyCart =
          <div className='container'>
            <div className='cart__main'>
              <div className='cart__title'>
                <div className='row flex align-items-center text-center'>
                  <div className='col-3'>
                    <h4>Image</h4>
                  </div>
                  <div className='col-3'>
                    <h4>Name</h4>
                  </div>
                  <div className='col-2'>
                    <h4>Infor</h4>
                  </div>
                  <div className='col-2'>
                    <h4>Price</h4>
                  </div>
                  <div className='col-2'>
                    <h4>Delete</h4>
                  </div>
                </div>
              </div>
              { requireCart.map( (item, index) =>
                <ItemCart
                  item={item}
                  key={index}
                  requireDelProductInTheCart = {this.handleDelProductInTheCart}
                />
              )}
              <div className='cart__total'>
                <div className='row flex align-items-center text-center'>
                  <div className='col-3 cart__total--des'>
                    <h4>Total:</h4>
                  </div>
                  <div className='col-3 cart__total--fill' >
                  </div>
                  <div className='col-2 cart__total--fill'>

                  </div>
                  <div className='col-2 cart__total--value'>
                    <span>{total}</span>
                  </div>
                  <div className='col-2 cart__total--fill'>
                  </div>
                </div>
              </div>
              <div className='cart-directional'>
                <div className='row'>
                  <Link to='/checkout' className='col-md-6'>
                    <button type='button' className='btn-page'>
                      <span>Check Out</span>
                    </button>
                  </Link>
                  <Link to='/product-category/all' className='col-md-6'>
                    <button type='button' className='btn-page'>
                      <span>Continue Shopping</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

    return (
      <section className="cart">
        <div className='title__page--home'>
          <h6 className='title__page--home__sub'>Page</h6>
          <h4 className='title__page--home__main'>Cart</h4>
        </div>
        { bodyCart }
      </section>
    );
  }
}

export default Cart;
