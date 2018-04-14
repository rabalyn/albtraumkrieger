import React, { Component } from 'react'
import config from './config'

class User extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const loginUrl = config.apiurlbase + '/login'
    console.log(loginUrl)

    const logindata = {
      username: this.state.username,
      password: this.state.password
    }
    const fetchOptions = {
      body: JSON.stringify(logindata), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'same-origin', // no-cors, cors, *same-origin
      redirect: 'follow', // *manual, follow, error
      referrer: 'no-referrer', // *client, no-referrer
    }

    const loginFetch = async () => {
      await fetch(loginUrl, fetchOptions)
        .then(res => res.json())
        .then(res => {
          console.log(res)
        })
        .catch(reason => {
          console.error('Error on login: ', reason)
        })
    }
    
    const fooFetch = async () => {
      await fetch(config.apiurlbase + '/foo')
        .then(res => res.json())
        .then(res => {
          console.log(res)
        })
        .catch(reason => {
          console.error(reason)
        })
    }

    loginFetch()
    fooFetch()
  }

  render() {
    return (
      <div className="content row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-6 col-xl-6 card">
          <h5 className="card-header">Login</h5>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label htmlFor="username" className="col-5 col-form-label">Accountname</label>
                <div className="col-7">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="gw2account.1234"
                    value={this.state.username}
                    onChange={this.handleChange}
                    autoFocus
                  />
                </div>
                <label htmlFor="password" className="col-5 col-form-label">Passwort</label>
                <div className="col-7">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Passwort"
                    value={this.state.password}
                    onChange={this.handleChange} 
                  />
                </div>
                <div className="col-4"></div>
                <button
                  type="submit"
                  className="col-4 btn btn-dark btn-block"
                  disabled={!this.validateForm()}
                >
                  Anmelden
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default User