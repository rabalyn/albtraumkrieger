import React, { Component } from 'react'

class Roleplay extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h3>
            <button className={this.props.show ? "btn btn-secondary" : "btn btn-secondary collapsed"} data-toggle="collapse" data-target={"#" + this.props.datatarget}>
              {this.props.cardtitle}
            </button>
          </h3>
        </div>

        <div id={this.props.datatarget} className={this.props.show ? "collapse show" : "collapse"} data-parent={"#" + this.props.dataparent}>
          <div className="card-body">
            {this.props.description}
          </div>
        </div>
      </div>
    )
  }
}

export default Roleplay