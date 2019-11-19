import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountRegister: {
        fullname: '',
        password: '',
        email: '',
        phonenumber: '',
        address: ''
      },
      error: {
        fullname: '',
        password: '',
        email: '',
        phonenumber: '',
        address: ''
      },
      statusRegister: false,
      notificationRegister: ''
    }
  }

  checkValueInput = (name, value) => {
    let nameTransform;
    switch(name) {
      case 'fullname':
        nameTransform = 'Fullname !';
        break;
      case 'password':
        nameTransform = 'Password !';
        break;
      case 'email':
        nameTransform = 'Email !';
        break;
      case 'phonenumber':
        nameTransform = 'Phone Number !';
        break;
      default:
        nameTransform = 'Address !';
    }

    if (value === '') {
      return `Please Enter ${nameTransform}`;
    } else {
      if (name === 'email') {
        let validationEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        if (validationEmail.test(value) === false) {
          return 'Please enter the correct email format!'
        }
      }
      if (name === 'phonenumber') {
        let validationPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (validationPhone.test(value) === false) {
          return 'Please enter the correct phone number format!'
        }
      }
      return '';
    }
  }

  changeValueRegister = (event) => {
    let { name, value } = event.target;
    let { accountRegister } = this.state;

    accountRegister[name] = value;
    this.setState({accountRegister});
  }

  checkValueFormRegister = (accountRegister, error) => {
    let status = false;

    for ( let item in accountRegister ) {
      let errorValue = this.checkValueInput(item, accountRegister[item]);
      error[item] = errorValue;
    }

    for (let nameError in error) {
      if ( error[nameError] !== '') {
        status = false;
        break;
      }
      status = true;
    }
    return {
      error,
      status
    }
  }

  checkHistory = () => {
    this.props.history.goBack();

    setTimeout(() => {
      let { pathname } = this.props.history.location;
      if(pathname === '/login') {
        this.props.history.push('/');
      }
    }, 100);

  }

  registerAccount = (event) => {
    event.preventDefault();
    let { accountRegister, error } = this.state;
    let { formRegister } = this.refs;

    //check value form register
    let handleError = this.checkValueFormRegister(accountRegister, error);
    this.setState({error: handleError.error});

    if(handleError.status) {
      axios({
        url: formRegister.action,
        method: formRegister.method,
        data: {accountRegister},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      }).then( res => {
        if (typeof(res.data) === 'string') {
          this.setState({notificationRegister: res.data})
        } else if (typeof(res.data) === 'object') {

          this.props.registerAccount(res.data);
          this.checkHistory();// check goBack === component login
        }
      })
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let { error, notificationRegister } = this.state;
    return (
      <section className="register" data-register>
        <div className='container'>
          <div className='register__wrapper'>
            <div className='title__page--home'>
              <h6 className='title__page--home__sub'>Page</h6>
              <h4 className='title__page--home__main'>Register</h4>
            </div>
            <div className='register__main'>
              <form action='http://localhost:4000/server/register.php' method='post' ref='formRegister'>
                <fieldset>
                  <div className='register__group'>
                    <label htmlFor='fullname'>Full Name: <span className='register__tick'>*</span></label>
                    <div className='register__input'>
                      <input id='fullname' name='fullname' defaultValue='' ref='fullname' onChange={this.changeValueRegister}/>
                    </div>
                    <div className='register__error'>
                      {error.fullname}
                    </div>
                  </div>
                  <div className='register__group'>
                    <label htmlFor='email'>Email: <span className='register__tick'>*</span></label>
                    <div className='register__input'>
                      <input id='email' name='email' defaultValue='' ref='email' onChange={this.changeValueRegister}/>
                    </div>
                    <div className='register__error'>
                      {error.email}
                    </div>
                  </div>
                  <div className='register__group'>
                    <label htmlFor='password'>Password: <span className='register__tick'>*</span></label>
                    <div className='register__input'>
                      <input type='password' id='password' name='password' defaultValue='' ref='password' onChange={this.changeValueRegister}/>
                    </div>
                    <div className='register__error'>
                      {error.password}
                    </div>
                  </div>
                  <div className='register__group'>
                    <label htmlFor='phonenumber'>Phone Number: <span className='register__tick'>*</span></label>
                    <div className='register__input'>
                      <input id='phonenumber' name='phonenumber' defaultValue='' ref='phonenumber' onChange={this.changeValueRegister}/>
                    </div>
                    <div className='register__error'>
                      {error.phonenumber}
                    </div>
                  </div>
                  <div className='register__group'>
                    <label htmlFor='address'>Address: <span className='register__tick'>*</span></label>
                    <div className='register__input'>
                      <input id='address' name='address' defaultValue='' ref='address' onChange={this.changeValueRegister}/>
                    </div>
                    <div className='register__error'>
                      {error.address}
                    </div>
                  </div>
                  <div className='register__notifi'>
                    <h5 className='register__notifi--title'>{notificationRegister}</h5>
                  </div>
                  <button type='submit' onClick={this.registerAccount} className='btn-page'>
                    <span>Register</span>
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Register);
