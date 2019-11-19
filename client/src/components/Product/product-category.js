import React, { Component } from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import LoadingOverlay from 'react-loading-overlay';
import HashLoader from 'react-spinners/HashLoader'

import ItemProductCategory from './items-product-category';
import FilterProduct from './filter-product';

class ProductCategory extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    nameProductCategory: '',
      productByCategory: [],
      pagiCurrent: 1,
      generalFilter: [],
      isActive: true,
      isLoadingPage: false
	  }
	}

  UNSAFE_componentWillMount() {
    // get value pagination page from App Component
    let { dataValuePagi, receiveFilterFromApp } = this.props;
    let { refreshPageProduct }= this.props.location;
    let { name } = this.props.match.params;

    refreshPageProduct === true && this.props.sendFilterToApp([]);

    this.setState({
      generalFilter: receiveFilterFromApp,
      pagiCurrent: dataValuePagi,
      nameProductCategory: name
    });

		axios({
		  method: 'post',
		  url: 'http://localhost:4000/server/test.php',
		  data: {name},
		  contentType: "application/json; charset=utf-8",
		  dataType: "json",
		}).then( res => {
      this.setState({productByCategory: res.data, isActive: false, isLoadingPage: true});
		});
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    this.setState({generalFilter: nextProps.receiveFilterFromApp});

    // // check :name match params
    if(this.props.match.params.name !== nextProps.match.params.name) {
      let { name } = nextProps.match.params;
      this.setState({ nameProductCategory: name, isActive: true });

      axios({
        method: 'post',
        url: 'http://localhost:4000/server/test.php',
        data: {name},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      }).then( res => {
        this.setState({productByCategory: res.data, isActive: false, isLoadingPage: true});
      });

    }
  }

  getValuePagi = (e) => {
    let valuePagi = parseInt(e.target.value);

    if(valuePagi !== this.state.pagiCurrent) {
      this.setState({pagiCurrent: valuePagi})
    }

    this.props.requireNPP(valuePagi);//send value navi to App Component

    window.scrollTo(0, 0);// scroll page top
  }

  refreshPagi = (status) => {
    if ( status === true) {
      this.setState({pagiCurrent: 1});
      this.props.requireNPP(1);
    }
  }

  handleFilter = (filter) => {
    let { generalFilter } = this.state;
    let { status, type } = filter;

    if ( status ) {
      generalFilter.push(filter);
    } else {
      generalFilter = generalFilter.filter( (item) => {
        return type !== item.type
      })
    }

    this.props.sendFilterToApp(generalFilter);
  }

  handleProductsFilter = () => {
    let { productByCategory, generalFilter } = this.state;
    let productsFilter = productByCategory;

    for ( let itemFilter of generalFilter ) {
      productsFilter = productsFilter.filter( (item) => {
        return itemFilter.type === item[itemFilter.name]
      })
    }
    return productsFilter;
  }

  handleProductAddToCart = (productAddToCart) => {
    this.props.requireProductAddToCartToApp(productAddToCart)
  }

  render() {
    let { productByCategory, pagiCurrent, generalFilter, isActive } = this.state;

    let products; // Create products to accommodate products in many cases

    generalFilter.length === 0 ?
      products = productByCategory :
      products = this.handleProductsFilter();

    let totalPage = 0; // total Pagination Product Category

    products.map( (item, index) => {
      if ( index % 6 === 0 ) {
        totalPage += 1;
      }
      return item['page'] = totalPage;
    })

    let btnPagi = [];

    for( let i = 1; i <= totalPage; i++ ) {
      if ( i === pagiCurrent ) {
        btnPagi = [...btnPagi, {value: i, active: true}]
      } else { btnPagi = [...btnPagi, {value: i, active: false}] }
    }
    let productsPagination = products.filter( (item ) => {
      return item.page === pagiCurrent
    })

    // create pagination
    let pagination =
        <div className='pagination--all'>
          <ul>
            { btnPagi.map( (item, index) =>
              <li key={index}>
                <button
                  value={item.value}
                  onClick={this.getValuePagi}
                  className={item.active === true ? 'active_btn--pagi' : 'btn--pagi'}
                >
                    {item.value}
                </button>
              </li>)
            }
          </ul>
        </div>

    // create Body Product Category
    let bodyProductCategory;
    if( products.length === 0 ) {
      bodyProductCategory =
          <div className='col-md-9 col-lg-10 no-product'>
            <h2 className='title'>
              There is currently no product !!
            </h2>
          </div>
    } else {
      bodyProductCategory =
          <div className='col-md-9 col-lg-10 product-category__main'>
            <LoadingOverlay
              active={isActive}
              text='Loading...'
              spinner={<HashLoader />}
              >
                <div className='product-category__groupitem'>
                  <div className='row'>
                    { productsPagination.map((item, index) =>
                      <ItemProductCategory
                        item={item}
                        key={index}
                        requireProductAddToCart = {this.handleProductAddToCart}
                      /> )
                    }
                  </div>
                </div>
                { pagination }
            </LoadingOverlay>
          </div>
    }

    // create filter products
    let filterMain =
        <FilterProduct
          sendFilterToProductPage = {this.handleFilter}
          requireFilterFromProducts = {generalFilter}
          requireRefreshPagi = {this.refreshPagi}
        />;


    let loadingPage =
      <div className='col-md-9 col-lg-10 product-category__main'>
        <LoadingOverlay active={true}
          text='Loading...'
          spinner={<HashLoader />}
        >
        </LoadingOverlay>
      </div>

  	return (
      <CSSTransition classNames='product-category' in={true} appear={true} timeout={{appear: 600}}>
        <section className="product-category">
          <div className='container'>
            <div className='row'>
              { filterMain }
              { this.state.isLoadingPage && bodyProductCategory }
              { !this.state.isLoadingPage && loadingPage }
            </div>
          </div>
        </section>
      </CSSTransition>
	  );
  }
}

export default ProductCategory;
