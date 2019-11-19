import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountCheckOut: null,
      disabledInput: false
    }
  }

  UNSAFE_componentWillMount() {
    this.updateProductPrices();
  }

  updateProductPrices = () => {
    let { checkoutCart } = this.props;
    for ( let item of checkoutCart ) {
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

  componentDidMount() {
    let { requireAccountCheckOut } = this.props;
    let formCheckout = this.refs.formcheckout;

    axios({
      url: formCheckout.action,
      method: formCheckout.method,
      data: {account: requireAccountCheckOut},
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    }).then( res => {
      if (res.data !== null) {
        this.setState({accountCheckOut: res.data});
        this.autoEnterData();
      }
    })

    window.scrollTo(0, 0);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { email } = nextProps.requireAccountCheckOut;
    // While at checkout page, clicking out the account will reset the state

    if(email === '') {
      this.setState({accountCheckOut: null});

      setTimeout(() => {
        this.autoEnterData();
      }, 100);
    }
  }

  autoEnterData = () => {
    let { accountCheckOut, disabledInput } = this.state;

    if ( accountCheckOut === null) {
      for ( let name in this.refs ) {
        this.refs[name].value = ''
      }

      disabledInput = false;

    } else {
      let { fullname, email, phonenumber, address  } = this.refs;

      fullname.value = accountCheckOut['fullname'];
      email.value = accountCheckOut['email'];
      phonenumber.value = accountCheckOut['phonenumber'];
      address.value = accountCheckOut['address'];

      disabledInput = true;
    }

    this.setState({disabledInput});
  }

  render() {
    let { disabledInput } = this.state;
    let { checkoutCart } = this.props;
    let total = checkoutCart.reduce( (total, item) => {
      let price = parseInt(item.Price);
      return total + price;
    }, 0);

    let styleInput;
    disabledInput === true ?
      styleInput = {background: 'rgb(235, 235, 228)'} :
      styleInput = {background: 'none'}

    return (
      <section className="checkout">
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 checkout__infor'>
              <div className='checkout__title'>
                <h3>Account Information Checkout</h3>
              </div>
              <div className='checkout__direc--register'>
                <span>Don't have an account yet? </span>
                <Link to='/register' className='checkout__link--color'>
                  Please register before checkout!
                </Link>
              </div>
              <form action='http://localhost:4000/server/checkout.php' method='post' ref='formcheckout'>
                <fieldset>
                  <div className='checkout__wrapper'>
                    <div className='checkout__input' style={styleInput}>
                      <input type='text' placeholder='Full Name' defaultValue='' name='' ref='fullname' disabled={disabledInput}/>
                    </div>
                  </div>
                  <div className='checkout__wrapper'>
                    <div className='checkout__input' style={styleInput}>
                      <input type='text' placeholder='Email' defaultValue='' name='' ref='email' disabled={disabledInput}/>
                    </div>
                  </div>
                  <div className='checkout__wrapper'>
                    <div className='checkout__input' style={styleInput}>
                      <input type='text' placeholder='PhoneNumber' defaultValue='' name='' ref='phonenumber' disabled={disabledInput}/>
                    </div>
                  </div>
                  <div className='checkout__wrapper'>
                    <div className='checkout__input' style={styleInput}>
                      <input type='text' placeholder='Address' defaultValue='' name='' ref='address' disabled={disabledInput}/>
                    </div>
                  </div>
                </fieldset>
              </form>
              <div className='checkout__direc'>
                <Link to='/cart' className='checkout__link--color'>
                  &lt; Back To Cart
                </Link>
                <Link to='/product-category/all'>
                  <button type='button' className='btn-page btn-page--white'>
                    <span>Continue Shopping</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className='col-lg-6 checkout__payment'>
              <div className='checkout__title'>
                <h3>Invoice information</h3>
              </div>
              <div className='checkout__invoice'>
                <div className='checkout__invoice__products'>
                  {checkoutCart.map( (item, index) =>
                    <div className='checkout__invoice__items' key={index}>
                      <div className='checkout__invoice__items--image'>
                        <img src={item.avata} alt=''/>
                      </div>
                      <div className='checkout__invoice__items--infor'>
                        <div className='checkout__invoice__items--infor--attr'>
                          <h6 className='name'>{item.NameProduct}</h6>
                          <span>{item.color} / {item.size}</span>
                        </div>
                        <div className='checkout__invoice__items--infor--price'>
                          <span className='price'>{item.Price}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='checkout__invoice__total'>
                  <span>Total: </span>
                  <span>{total}</span>
                </div>
                <div className='checkout__invoice__complete'>
                  <button type='button' className='btn-page btn-page--black' onClick={this.payTheBill}>
                    <span>Payment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CheckOut;
