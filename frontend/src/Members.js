import React, { Component } from 'react'

import Rank from './Rank'
import config from './config'

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

    const url = config.apiurlbase + '/members'
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        const members = jsonResponse.result
        let ranks = []
        members.forEach(member => {
          if(ranks.indexOf(member.rank) === -1) {
            ranks.push(member.rank)
          }
        })

        const allRanks = {}
        ranks.forEach(rank => {
          allRanks[rank] = members.filter(member => member.rank === rank).sort(this.compareDate)
        })

        const memberNames = members.map((member) => member.accountid.split('.')[0])

        this.setState({
          memberNames: memberNames,
          ranks: allRanks
        })
      })
      .catch(reason => {
        console.error(reason)
      })
  }

  componentDidUpdate() {

  }

  render() {
    if(this.state && this.state.ranks) {
      return (
        <div className="content">
          <div className="row justify-content-center">
            <div className="col-12">
            <div className="card-columns">
              {
                Object.keys(this.state.ranks).map((rank, idx) => {
                  return <Rank cols="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" key={idx} name={rank} rankMembers={this.state.ranks[rank]} />
                })
              }
            </div>
            </div>
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