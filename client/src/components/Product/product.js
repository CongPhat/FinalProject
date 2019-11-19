import React, { Component } from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProduct: {}
    }
  }

  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0);

    let { nameProduct } = this.props.match.params;
    let { view } = this.props.location;
    let productSend;

    view === 'true' ?
      productSend = { name: nameProduct, increaseViews: true } :
      productSend = { name: nameProduct, increaseViews: false }

    axios({
      method: 'post',
      url: 'http://localhost:4000/server/product.php',
      data: productSend,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    }).then( res => {
      this.setState({dataProduct: res.data});
    });
  }

  addToCart = () => {
    let { dataProduct } = this.state;
    let productAddToCartTransform = {...dataProduct};
    this.props.requireProductAddToCartToApp(productAddToCartTransform);
  }

  render() {
    let { NameProduct,
          Price,
          avata,
          color,
          size
        } = this.state.dataProduct;

    return (
      <section className="products">
        <div className='container'>
          <div className='products__main'>
            <div className='row'>
              <div className='col-md-6 col-lg-4 items products__image'>
                <CSSTransition classNames='products' in={true} appear={true} timeout={{appear: 600}}>
                  <img src={avata} alt={NameProduct} />
                </CSSTransition>
              </div>
              <div className='col-md-6 col-lg-5 items products__inforproduct'>
                <div className='products__meta'>
                  <h2 className='name'>{NameProduct}</h2>
                  <span className='price'>{Price}</span>
                  <span className='color'>Color: {color}</span>
                  <span className='size'>Size: {size}</span>
                </div>
                <button
                    className='btn-page'
                    type='submit'
                    onClick={this.addToCart}>
                  <span>Add to cart</span>
                </button>
              </div>
              <div className='col-lg-3 items products__desc'>
                <h3>Product Description</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Product;
