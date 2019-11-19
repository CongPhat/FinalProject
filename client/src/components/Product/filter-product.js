import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class FilterProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [],
      statusFilterBody: {
        color: false,
        size: false
      }
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    this.setState({filter: nextProps.requireFilterFromProducts});
  }

  componentDidUpdate = () => {
    let { filter } = this.state;
    if ( filter.length > 0) {
      for ( let itemFilter of filter) {
        this.refs[itemFilter.type].checked = true;
      }
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const valueFilter = target.value;
    const name = target.name;

    let filter;

    filter = { name, type: valueFilter, status: value};

    this.props.sendFilterToProductPage(filter);
    this.props.requireRefreshPagi(true);
  }

  setStatusFilter = (event) => {
    let { statusFilterBody } = this.state;
    let { name } = event.target;
    statusFilterBody[name] = !statusFilterBody[name];
    this.setState({statusFilterBody});
  }

  styleShow = () => {
    return {
      height: 'auto',
    }
  }

  styleVisible = () => {
    return {
      height: 0,
      overflow: 'hidden',
    }
  }

  toggleFilter = (dataTypeFilter) => {
    if (dataTypeFilter) {
      return this.styleShow();
    }
    else return this.styleVisible();
  }

  render() {
    let { color, size } = this.state.statusFilterBody;

    return (
      <div className="col-md-3 col-lg-2 product-category__filter">
        <div className='filter__header'>
          <h2>Filter</h2>
        </div>
        <div className='filter__body' onClick={this.toggle}>
          <div className='filter__item'>
            <button type='button' className='filter__item__collapse' name='color' onClick={this.setStatusFilter}>
              Color
            </button>
            <div className='filter__item__main' style={this.toggleFilter(color)}>
              <div className='item'>
                <input type='checkbox' value='red' name='color' id='red' onChange={this.handleInputChange} ref='red'/>
                <label htmlFor='red'>Red</label>
              </div>
              <div className='item'>
                <input type='checkbox' name='color' id='yellow' onChange={this.handleInputChange} value='yellow' ref='yellow'/>
                <label htmlFor='yellow'>Yellow</label>
              </div>
              <div className='item'>
                <input type='checkbox' name='color' id='black' onChange={this.handleInputChange} value='black' ref='black'/>
                <label htmlFor='black'>Black</label>
              </div>
              <div className='item'>
                <input type='checkbox' name='color' id='white' onChange={this.handleInputChange} value='white' ref='white'/>
                <label htmlFor='white'>White</label>
              </div>
              <div className='item'>
                <input type='checkbox' name='color' id='blue' onChange={this.handleInputChange} value='blue' ref='blue'/>
                <label htmlFor='blue'>Blue</label>
              </div>
              <div className='item'>
                <input type='checkbox' name='color' id='grey' onChange={this.handleInputChange} value='grey' ref='grey'/>
                <label htmlFor='grey'>Grey</label>
              </div>
            </div>
          </div>
          <div className='filter__item'>
            <button type='button' className='filter__item__collapse' name='size' onClick={this.setStatusFilter}>
              Size
            </button>
            <div className='filter__item__main' style={this.toggleFilter(size)}>
              <div className='item'>
                <input type='checkbox' value='s' name='size' id='s' onChange={this.handleInputChange} ref='s'/>
                <label htmlFor='s'>S</label>
              </div>
              <div className='item'>
                <input type='checkbox' name='size' id='m' onChange={this.handleInputChange} value='m' ref='m'/>
                <label htmlFor='m'>M</label>
              </div>
              <div className='item'>
                <input type='checkbox' name='size' id='l' onChange={this.handleInputChange} value='l' ref='l'/>
                <label htmlFor='l'>L</label>
              </div>
              <div className='item'>
                <input type='checkbox' name='size' id='xl' onChange={this.handleInputChange} value='xl' ref='xl'/>
                <label htmlFor='xl'>XL</label>
              </div>
              <div className='item'>
                <input type='checkbox' name='size' id='xxl' onChange={this.handleInputChange} value='xxl' ref='xxl'/>
                <label htmlFor='xxl'>XXL</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FilterProduct);
