import React, { Component } from 'react'
import ImageGallery from './ImageGallery'

import images from './Screenshot-images'

class Screenshots extends Component {
  render() {
    return (
      <div className="content">
        <div className="card">
          <h5 className="card-header">Screenshots</h5>
          <div className="card-body">
            <ImageGallery images={images} />
          </div>
        </div>
      </div>
    )
  }
}

export default Screenshots