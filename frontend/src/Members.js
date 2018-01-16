import React, { Component } from 'react'

import Rank from './Rank'

class Members extends Component {
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

    fetch('/members')
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        const members = jsonResponse.result

        const memberNames = members.map((member) => member.name.split('.')[0])
        const firstborns = members.filter(member => member.rank === 'Firstborn').sort(this.compareDate)
        const shadyWardens = members.filter(member => member.rank === 'Shady Warden').sort(this.compareDate)
        const vacationers = members.filter(member => member.rank === 'Vacationer').sort(this.compareDate)
        const nightmareScout = members.filter(member => member.rank === 'Nightmare Scout').sort(this.compareDate)
        const bloodstones = members.filter(member => member.rank === 'Fam Bloodstone').sort(this.compareDate)

        this.setState({
          memberNames: memberNames,
          firstborns: firstborns,
          shadyWardens: shadyWardens,
          vacationers: vacationers,
          nightmareScout: nightmareScout,
          bloodstones: bloodstones
        })
      })
  }

  componentDidUpdate() {

  }

  render() {
    if(this.state && this.state.firstborns) {
      return (
        <div className="content">
          <div className="row justify-content-center">
            <Rank cols="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5" name="Firstborn" rankMembers={this.state.firstborns} />
            <Rank cols="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5" name="Familie Bloodstone" rankMembers={this.state.bloodstones} />
            <Rank cols="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5" name="Shady Warden" rankMembers={this.state.shadyWardens} />
            <Rank cols="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5" name="Nightmare Scout" rankMembers={this.state.nightmareScout} />
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