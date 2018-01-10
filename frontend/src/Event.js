import React, { Component } from 'react'

class Event extends Component {
  render() {
    return (
      <div className={String().concat(this.props.cols, " card")} >
        <div className="card-body">
          <h5 className="card-title">{this.props.day}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{this.props.start} - {this.props.end} Uhr</h6>
          <ul className="list-group">
            {
              this.props.infoText.length > 0
                ? this.props.infoText.map((info) => <li className="list-group-item list-group-item-dark" key={info.id}>{info.text}</li>)
                : <li className="list-group-item list-group-item-dark">Nichts geplant :o</li>
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Event