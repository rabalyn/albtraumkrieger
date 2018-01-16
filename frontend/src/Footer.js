import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer className="footer position-fixed">
        <div className="container col-12">
          <span className="text-muted">Powered by <a href="https://reactjs.org/">react</a>, <a href="https://getbootstrap.com/">bootstrap</a> and <a href="https://nodejs.org/en/">node.js</a> - crafted by <a href="https://twitter.com/rabalyn">@rabalyn</a></span>
        </div>
      </footer>
    )
  }
}

export default Footer