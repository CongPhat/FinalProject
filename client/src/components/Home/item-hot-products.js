import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ItemHotProducts extends Component {
  constructor(props) {
    super(props);
    this.State = {
      clientXonMouseDown: null,
      clientYonMouseDown: null
    }
  }

  handleOnMouseDown (e) {
    this.setState({
      clientXonMouseDown: e.clientX,
      clientYonMouseDown: e.clientY
    })
    e.preventDefault() // stops weird link dragging effect
  }

  handleOnClick (e) {
    e.stopPropagation()
    if (this.state.clientXonMouseDown !== e.clientX ||
        this.state.clientYonMouseDown !== e.clientY) {
      // prevent link click if the element was dragged
      e.preventDefault()
    }
  }

  render() {
    let {
      NameProduct,
      Price,
      avata,
    } = this.props.item;
    return (
      <Link to={{pathname: `/product/${NameProduct}`, view: 'true'}}
        onMouseDown={e => this.handleOnMouseDown(e)}
        onClick={e => this.handleOnClick(e)}>
        <div className='hot-products__items'>
          <div className='hot-products__items--image'>
            <img src={avata} alt={NameProduct}/>
          </div>
          <div className='hot-products__items--infor'>
            <h3 className='name'>{NameProduct}</h3>
            <span className='price'>{Price}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default ItemHotProducts;
