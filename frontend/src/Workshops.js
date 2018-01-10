import React, { Component } from 'react'
import ImageGallery from './ImageGallery'
import images from './Workshop-images'

class Workshops extends Component {
  render() {
    return (
      <div className="content">
        <div className="card">
          <h5 className="card-header">Workshops</h5>
          <div className="card-body">
            <ImageGallery images={images} />
          </div>
        </div>
      </div>
    )
  }
}

export default Workshops