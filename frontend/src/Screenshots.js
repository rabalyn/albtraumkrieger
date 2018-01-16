import React, { Component } from 'react'
import ImageGallery from './ImageGallery'

import images from './Screenshot-images'

class Screenshots extends Component {
  render() {
    return (
      <div className="content row justify-content-center">
        <ImageGallery images={images} title="Screenshots" />
      </div>
    )
  }
}

export default Screenshots