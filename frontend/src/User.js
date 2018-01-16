import React, { Component } from 'react'

class User extends Component {
  render() {
    return (
      <div className="content row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-6 col-xl-6 card">
          <h5 className="card-header">Login</h5>
          <div className="card-body">
            <form>
              <div className="form-group row">
                <label htmlFor="username" className="col-5 col-form-label">Accountname</label>
                <div className="col-7">
                  <input type="text" className="form-control" id="username" placeholder="gw2account.1234" />
                </div>
                <label htmlFor="userpassword" className="col-5 col-form-label">Passwort</label>
                <div className="col-7">
                  <input type="password" className="form-control" id="userpassword" placeholder="Passwort" />
                </div>
                <div className="col-4"></div>
                <button type="submit" className="col-4 btn btn-dark btn-block">Anmelden</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default User