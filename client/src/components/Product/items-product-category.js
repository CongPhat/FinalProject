import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

class ItemProductCategory extends Component {
  addProduct = () => {
    let { item } = this.props;
    let productAddToCartTransform = {...item};

    this.props.requireProductAddToCart(productAddToCartTransform);
  }

  render() {
    let { item } = this.props;
    return (
      <div className="col-md-6 col-lg-4 product-category__single">
        <div className='product-category__item'>
          <div className='product-category__image'>
            <Link to={{pathname: `/product/${item.NameProduct}`, view: 'true'}} className='directory'>
              <img src={item.avata} alt={`${item.NameProduct}`}/>
            </Link>
          </div>
          <div className='product-category__info'>
            <h4 className='info-name'>{item.NameProduct}</h4>
            <p className='info-price'>{item.Price}</p>
          </div>
          <div className='product-category__addcart'>
            <button type='button' className='add-to-cart' onClick={this.addProduct}>
              <FontAwesomeIcon icon={faCartPlus}/>
            </button>
          </div>
        </div>
    </div>
    );
  }
}

export default ItemProductCategory;
