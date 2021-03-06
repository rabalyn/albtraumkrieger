import React, { Component } from 'react'

import 'react-table/react-table.css'
import './include/bootstrap'
import './styles/css/cardColumns.css'
import './styles/css/App.css'

import Navbar from './Navigation'
import Footer from './Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <Footer />
      </div>
    )
  }
}

export default App