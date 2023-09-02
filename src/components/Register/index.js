import {Component} from 'react'
import {withRouter} from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'

import './index.css'

class Register extends Component {
  state = {
    name: '',
    password: '',
    username: '',
    gander: 'male',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangename = e => {
    this.setState({name: e.target.value})
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onChangeGander = e => {
    this.setState({gander: e.target.value})
  }

  renderRadioField = () => {
    const {gander} = this.state

    return (
      <>
        <label className="input-label" htmlFor="gander">
          Gander
        </label>
        <select
          className="password-input-field"
          onChange={this.onChangeGander}
          id="gander"
          value={gander}
        >
          <option value="male" selected>
            Male
          </option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
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
          type="email"
          id="username"
          className="password-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Enter Your Email"
        />
      </>
    )
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

  renderNameField = () => {
    const {name} = this.state

    return (
      <>
        <label className="input-label" htmlFor="name">
          NAME
        </label>
        <input
          type="text"
          id="name"
          className="username-input-field"
          value={name}
          onChange={this.onChangename}
          placeholder="Enter Your Name"
        />
      </>
    )
  }

  sendTheDetails = async () => {
    const {name, username, password, gander} = this.state
    const {history} = this.props
    const userDetails = {
      username,
      password,
      gander,
      name,
    }

    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const Response = await fetch(
      'https://demo-hosting-su9j.onrender.com/register',
      option,
    )
    const data = await Response.json()
    if (Response.ok) {
      const optionTWO = {
        method: 'POST',
        body: JSON.stringify({username: 'rahul', password: 'rahul@2021'}),
      }
      const ResponseTwo = await fetch('https://apis.ccbp.in/login', optionTWO)
      const dataTwo = await ResponseTwo.json()
      Cookies.set('jwt_token', dataTwo.jwt_token, {
        expires: 30,
      })
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg, showSubmitError: true})
    }
  }

  clickRegister = e => {
    e.preventDefault()
    const {username, name, password, gander} = this.state
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (username.match(validRegex) && name !== '' && password !== '') {
      this.sendTheDetails()
    } else {
      this.setState({
        errorMsg: 'Please Enter Valid Details',
        showSubmitError: true,
      })
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <form className="form-container-login" onSubmit={this.clickRegister}>
        <div className="input-container">{this.renderNameField()}</div>
        <div className="input-container">{this.renderUsernameField()}</div>
        <div className="input-container">{this.renderPasswordField()}</div>
        <div className="input-container">{this.renderRadioField()}</div>
        <button type="submit" className="login-button">
          Register
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    )
  }
}

export default withRouter(Register)
