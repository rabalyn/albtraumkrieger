import React, { Component } from 'react'
import logo from './logo.svg'

import Home from './Home'
import Members from './Members'
import Guildhall from './Guildhall'
import Events from './Events'
import Manga from './Manga'
import Workshops from './Workshops'
import Screenshots from './Screenshots'
import User from './User'

const $ = window.jQuery

class Navigation extends Component {
  collapseNavbar(event) {
    const clickover = $(event.target)
    const navbar = $(".navbar-collapse");
    const opened = navbar.hasClass("show")
    const outside = clickover.hasClass("navbar-toggler")
    if (opened === true && !outside) {
      navbar.collapse('hide')
    }
  }

  componentDidMount() {
    $(".navbar li a").click((event) => {
      event.preventDefault()
      $(".navbar-collapse").collapse("hide")
    })

    $(document).on({
      'touchend': (e) => {
        this.collapseNavbar(e)
      },
      'click': (e) => {
        this.collapseNavbar(e)
      }
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar-content">
            <ul className="nav nav-tabs" id="tabs-tab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#tab-home" role="tab">
                  <img src={logo} className="App-logo" alt="logo"/> Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="members-tab" data-toggle="tab" href="#tab-members" role="tab">Mitglieder</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="hall-tab" data-toggle="tab" href="#tab-hall" role="tab">Gildenhalle</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="events-tab" data-toggle="tab" href="#tab-events" role="tab">Events</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="manga-tab" data-toggle="tab" href="#tab-manga" role="tab">GW2-Manga</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="workshops-tab" data-toggle="tab" href="#tab-workshops" role="tab">Workshop</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="screenshots-tab" data-toggle="tab" href="#tab-screenshots" role="tab">Screenshots</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="user-tab" data-toggle="tab" href="#tab-user" role="tab">Mein Account</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="tab-content" id="tabs-tabContent">
            <div className="tab-pane fade show active" id="tab-home" role="tabpanel"><Home /></div>
            <div className="tab-pane fade" id="tab-members" role="tabpanel"><Members /></div>
            <div className="tab-pane fade" id="tab-hall" role="tabpanel"><Guildhall /></div>
            <div className="tab-pane fade" id="tab-events" role="tabpanel"><Events /></div>
            <div className="tab-pane fade" id="tab-manga" role="tabpanel"><Manga /></div>
            <div className="tab-pane fade" id="tab-workshops" role="tabpanel"><Workshops /></div>
            <div className="tab-pane fade" id="tab-screenshots" role="tabpanel"><Screenshots /></div>
            <div className="tab-pane fade" id="tab-user" role="tabpanel"><User /></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navigation