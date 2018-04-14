import React, { Component } from 'react'
const titanEmbedUrl = 'https://titanembeds.com/embed/429764244595146753?theme=DiscordDark'

class TitanDiscordEmbed extends Component {
  render() {
    return (
      <div className="content row justify-content-center">
        <div className="card col-12" >
          <div className="card-body">
            <h5 className="card-title">Discord</h5>
            <iframe title="albha-discord" src={titanEmbedUrl} height="750" width="100%" frameBorder="0"></iframe>
          </div>
        </div>
      </div>
    )
  }
}

export default TitanDiscordEmbed