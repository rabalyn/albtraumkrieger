import React, { Component } from 'react'
import config from './config.json'
import gw2apiClient from 'gw2api-client'
import cacheMemory from 'gw2api-client/build/cache/memory'

import Rank from './Rank'

class Members extends Component {
  constructor(props) {
    super(props)
    
    const api = new gw2apiClient()
    api.cacheStorage(cacheMemory())
    api.language('de')
    api.authenticate(config.api.guildToken)

    this.state = {
      client: api
    }

    api.guild(config.api.guildId).members().get().then((memberlist) => {
      this.setState({members: memberlist})
    })
  }

  compareDate(a, b) {
    if(a.joined > b.joined) return 1
    else if(a.joined < b.joined) return -1
    else return 0
  }

  componentDidMount() {
    const $ = window.jQuery
    
    $(() => {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  componentDidUpdate() {
    if(this.state.members && !this.state.memberNames) {
      const memberNames = this.state.members.map((member) => member.name.split('.')[0])
      const firstborns = this.state.members.filter(member => member.rank === 'Firstborn').sort(this.compareDate)
      const shadyWardens = this.state.members.filter(member => member.rank === 'Shady Warden').sort(this.compareDate)
      const vacationers = this.state.members.filter(member => member.rank === 'Vacationer').sort(this.compareDate)
      const nightmareScout = this.state.members.filter(member => member.rank === 'Nightmare Scout').sort(this.compareDate)
      const bloodstones = this.state.members.filter(member => member.rank === 'Fam Bloodstone').sort(this.compareDate)

      this.setState({
        memberNames: memberNames,
        firstborns: firstborns,
        shadyWardens: shadyWardens,
        vacationers: vacationers,
        nightmareScout: nightmareScout,
        bloodstones: bloodstones
      })
    }

  }

  render() {
    if(this.state.firstborns) {
      return (
        <div className="content">
          <div className="row">
            <div className="col-1"></div>
            <Rank cols="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5" name="Firstborn" rankMembers={this.state.firstborns} />
            <Rank cols="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5" name="Familie Bloodstone" rankMembers={this.state.bloodstones} />
            <div className="col-1"></div>
            <Rank cols="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5" name="Shady Warden" rankMembers={this.state.shadyWardens} />
            <Rank cols="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5" name="Nightmare Scout" rankMembers={this.state.nightmareScout} />
            <div className="col-xs-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
            <Rank cols="col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6" name="Vacationer" rankMembers={this.state.vacationers} />
          </div>
        </div>
      )
    } else {
      return (
        <div className="content">
          Mitglieder
        </div>
      )
    }
  }
}

export default Members