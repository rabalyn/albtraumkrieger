import React, { Component } from 'react'
import "react-image-gallery/styles/css/image-gallery.css"
import ReactImageGallery from 'react-image-gallery'

class ImageGallery extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 card">
        <h5 className="card-header">{this.props.title}</h5>
        <div className="card-body">
          <ReactImageGallery key={this.props.title} lazyLoad={true} items={this.props.images} showBullets={false} showPlayButton={false} slideOnThumbnailHover={false} showIndex={true}/>
        </div>
      </div>
    )
  }
}

export default ImageGallery