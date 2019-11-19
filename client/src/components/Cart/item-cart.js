import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class ItemCart extends Component {
  deleteProductInTheCart = () => {
    let { item } = this.props;
    this.props.requireDelProductInTheCart(item);
  }

  render() {
    let { NameProduct, Price, avata, color, size } = this.props.item;
    return (
      <div className='cart__item'>
        <div className='row flex align-items-center text-center'>
          <div className='col-3 cart__item--image'>
            <img src={avata} alt={NameProduct}/>
          </div>
          <div className='col-3'>
            <Link to={`/product/${NameProduct}`}>{NameProduct}</Link>
          </div>
          <div className='col-2'>
            <span>{color} / {size}</span>
          </div>
          <div className='col-2'>
            <span>{Price}</span>
          </div>
          <div className='col-2'>
            <button type='button' onClick={this.deleteProductInTheCart}>
              <FontAwesomeIcon icon={faTrashAlt}/>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemCart;
