import React, { Component } from 'react';
import axios from 'axios';
import 'parsleyjs';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        email: '',
        password: '',
        typeAccount: 'KH'
      },
      errorCheckAccountData: '',
      errorValueAccount : {
        errorEmail: '',
        errorPassWord: ''
      },
      callAccountServer: false
    }
  }

  changeAccountLogin = (event) => {
    let { account } = this.state;
    let valueChange = event.target.value;
    event.target.name === 'email' ?
      account['email'] = valueChange :
      account['password'] = valueChange

    this.setState({account});
  }

  checkValueAccount = (account) => {
    let { email, password } = account;
    let { errorValueAccount } = this.state;
    let valueEmpty = '';
    let status = true;

    // Set the original error account value
    this.setState({errorCheckAccountData: ''});

    //check username
    if ( email === '') {
      errorValueAccount = {...errorValueAccount, errorEmail: 'Please Enter Email !'};
      this.setState({errorValueAccount});
      status = false;
    } else {
      errorValueAccount = {...errorValueAccount, errorEmail: valueEmpty};
      this.setState({errorValueAccount});
    }

    //check password
    if ( password === '') {
      errorValueAccount = {...errorValueAccount, errorPassWord: 'Please Enter Password !'};
      this.setState({errorValueAccount});
      status = false;
    } else {
      errorValueAccount = {...errorValueAccount, errorPassWord: valueEmpty};
      this.setState({errorValueAccount});
    }

    if(status) {
      return true;
    } else return false;
  }

  checkTypeAccount = (accountCurrent) => {
    accountCurrent.typeaccount === 'NV' ? this.props.history.push('/adminstrator') : this.props.history.push('/');
  }

  getAccount = (event) => {
    event.preventDefault();
    let { account } = this.state;

    let valueOnCheckForm = this.checkValueAccount(account);

    if(valueOnCheckForm) {
      this.refs.email.value = '';
      this.refs.password.value = '';

      axios({
        method: 'post',
        url: 'http://localhost:4000/server/login.php',
        data: {account},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      }).then( res => {
        if(res.data === null){
          this.setState({errorCheckAccountData: 'You entered the wrong email or password. Please try again !'})
        } else {
          this.setState({account: res.data});

          this.props.requireAccount(this.state.account);
          this.checkTypeAccount(res.data);
          
        }
      });
    }
  }

  checkErrorLogin = (errorCheckAccountData) => {
    if (errorCheckAccountData !== '') {
      return (
        <div className='login__error' style={{color: 'red'}}>
          <span>{errorCheckAccountData}</span>
        </div>
      )
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let { errorCheckAccountData } = this.state;
    let errorLogin = this.checkErrorLogin(errorCheckAccountData);
    let { errorEmail, errorPassWord } = this.state.errorValueAccount;

    return (
      <div className='login'>
        <div className='container'>
          <div className='login__wrapper'>
            <div className='title__page--home'>
              <h6 className='title__page--home__sub'>Page</h6>
              <h4 className='title__page--home__main'>Login</h4>
            </div>
            <form method='post' action='http://localhost:4000/server/login.php' className='login__main' ref='login'>
              <fieldset>
                <div className='login__group'>
                  <label htmlFor='username'>Username:</label>
                  <div className='login__input'>
                    <input type='text' id='username' onChange={this.changeAccountLogin} name='email' ref='email'></input>
                  </div>
                  <div className='login__error'>
                    { errorEmail }
                  </div>
                </div>
                <div className='login__group'>
                  <label htmlFor='password'>Password:</label>
                  <div className='login__input'>
                    <input type='password' id='password' onChange={this.changeAccountLogin} name='password' ref='password'></input>
                  </div>
                  <div className='login__error'>
                    { errorPassWord }
                  </div>
                </div>
                <div className='login__error'>
                    { errorLogin }
                  </div>
                <div className='login__direc'>
                  <Link to='/register' alt=''>
                    No account yet? Sign up now
                  </Link>
                </div>
                <button type='submit' className='btn-page btn-page--black'onClick={this.getAccount}>
                  <span>Login</span>
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
