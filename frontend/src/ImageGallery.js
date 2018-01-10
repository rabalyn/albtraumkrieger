import React, { Component } from 'react'
import "react-image-gallery/styles/css/image-gallery.css"
import ReactImageGallery from 'react-image-gallery'

class ImageGallery extends Component {
  render() {
    return (
      <div className="row">
        <div className="hidden-sm-down      col-md-1 col-lg-1 col-xl-1"></div>
        <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
          <ReactImageGallery lazyLoad={true} items={this.props.images} showBullets={true} showPlayButton={false} />
        </div>
      </div>
    )
  }
}

export default ImageGallery