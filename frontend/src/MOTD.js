import React, { Component } from 'react'
import $ from 'jquery'
import '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCommentAlt } from '@fortawesome/fontawesome-free-solid'

class MOTD extends Component {
  componentDidMount() {
    $(() => {
      $('[data-toggle="popover"]').popover()
    })
  }
  render() {
    return (
      <button className="popoverButton" type="button" data-trigger="focus" data-toggle="popover" title="Ankündigung" data-content={this.props.motd}>
        <FontAwesomeIcon icon={faCommentAlt}/>
      </button>
    )
  }
}

export default MOTD