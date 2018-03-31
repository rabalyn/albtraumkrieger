import React, { Component } from 'react'
import config from './config'
import githubCat from './imgs/GitHub-Mark/PNG/GitHub-Mark-32px.png'
import ts3logo from './imgs/teamspeak-logo.svg'
import discordlogo from './imgs/discord-logo.png'

class Footer extends Component {
  render() {
    const confHost = "albha.rabalyn.de" //config.ts3host || "62.104.20.84"
    const confPort = "9987" //config.ts3port || 10118
    const ts3host = String().concat("ts3server://", confHost, "?port=", confPort)
    const discord = config.discord.invitelink || '#'

    return (
      <footer className="footer position-fixed">
        <div className="container col-12">
          <span className="text-muted">
            Powered by <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">react</a>, 
            <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer"> bootstrap</a> and 
            <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer"> node.js</a> - crafted by 
            <a href="https://twitter.com/rabalyn" target="_blank" rel="noopener noreferrer"> @rabalyn</a> 
          </span>

          <span className="text-muted float-right logolink">
            <a href={ts3host} target="_blank" rel="noopener noreferrer"><img src={ts3logo} alt="TeamSpeak logo" width="30" hspace="3"/></a>
          </span>
          <span className="text-muted float-right logolink-spacer logolink">
            <a href={discord} target="_blank" rel="noopener noreferrer"><img src={discordlogo} alt="Discord logo" width="30" hspace="3"/></a>
          </span>
          <span className="text-muted float-right logolink-spacer logolink">
            <a href="https://github.com/rabalyn/albtraumkrieger" target="_blank" rel="noopener noreferrer"><img src={githubCat} alt="Github logo" hspace="3"/></a>
          </span>
        </div>
      </footer>
    )
  }
}

export default Footer
