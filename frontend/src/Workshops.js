import React, { Component } from 'react'
import ImageGallery from './ImageGallery'
import images from './Workshop-images'

class Workshops extends Component {
  render() {
    return (
      <div className="content row justify-content-center">
        <ImageGallery images={images} title="Workshops" />
      </div>
    )
  }
}

export default Workshops