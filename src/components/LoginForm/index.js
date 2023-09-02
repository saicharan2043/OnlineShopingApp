import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Login from '../Login'
import Register from '../Register'

import './index.css'

class LoginForm extends Component {
  state = {isLoginTrue: true}

  clickLoginTab = () => {
    this.setState({isLoginTrue: true})
  }

  clickRegisterTab = () => {
    this.setState({isLoginTrue: false})
  }

  render() {
    const {isLoginTrue} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <div className="login-register-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="login-register-tab">
            <button
              className={`login-tab ${isLoginTrue && 'under-score'}`}
              onClick={this.clickLoginTab}
            >
              Login
            </button>
            <button
              className={`register-tab ${
                isLoginTrue === false && 'under-score'
              }`}
              onClick={this.clickRegisterTab}
            >
              Register
            </button>
          </div>
          {isLoginTrue ? <Login /> : <Register />}
        </div>
      </div>
    )
  }
}

export default LoginForm
