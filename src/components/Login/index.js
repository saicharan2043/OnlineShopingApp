import {Component} from 'react'
import {withRouter} from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = async () => {
    const {history} = this.props

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username: 'rahul', password: 'rahul@2021'}),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    Cookies.set('jwt_token', data.jwt_token, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://demo-hosting-su9j.onrender.com/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('helo')
    console.log(response.ok)
    if (response.ok === true) {
      console.log('vamish')
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Enter Your Email"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <form className="form-container-login" onSubmit={this.submitForm}>
        <div className="input-container">{this.renderUsernameField()}</div>
        <div className="input-container">{this.renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    )
  }
}

export default withRouter(Login)
