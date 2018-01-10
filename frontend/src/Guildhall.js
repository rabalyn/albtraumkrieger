import React, { Component } from 'react'
import config from './config.json'
import gw2apiClient from 'gw2api-client'
import cacheMemory from 'gw2api-client/build/cache/memory'

class Guildhall extends Component {
  constructor(props) {
    super(props)

    const api = new gw2apiClient()
    api.cacheStorage(cacheMemory())
    api.language('de')
    api.authenticate(config.api.guildToken)

    this.state = {
      client: api
    }

    
    api.guild(config.api.guildId).upgrades().get().then((upgrades) => {
      //console.table(upgrades)
      this.setState({ guildupgrades: upgrades })
    })

    api.guild(config.api.guildId).ranks().get().then((guildranks) => {
      //console.table(guildranks)
      this.setState({ guildranks: guildranks })
    })

    api.guild(config.api.guildId).storage().get().then((upgrades) => {
      //console.table(upgrades)
      this.setState({ guildStoredUpgrades: upgrades })
    })

    /*
    api.itemstats().get().then((itemstats) => {
      //console.table(itemstats)
      this.setState({ itemstats: itemstats })
    })
    */
  }

  render() {
    return (
      <div className="content">
        <div className="col-8 card">
          <h5 className="card-header">Gildeninfo</h5>
          <div className="card-body">
            {JSON.stringify(this.state.guildupgrades)}
            <br />
            {JSON.stringify(this.state.guildranks)}
          </div>
        </div>
      </div>
    )
  }
}

export default Guildhall