import React, { Component } from 'react'

class Guildhall extends Component {
  componentDidMount() {
    fetch('/hall')
      .then(response => response.json())
      .then(jsonResponse => {
        const hallInfo = jsonResponse.result
        const parsedLog = this._parseLog(hallInfo)
        this.setState({
          guildlog: parsedLog
        })
      })
  }

  _parseLog(rawLog) {
    if(!rawLog) return null

    let parsedLog = rawLog.map((entry, idx) => {
      //const logIndex = entry.id || null
      const username = entry.user
        ? entry.user.split('.')[0]
        : null
      const changedBy = entry.changed_by
        ? entry.changed_by.split('.')[0]
        : null
      const oldRank = entry.old_rank || null
      const newRank = entry.new_rank || null
      const time = new Date(entry.time).toLocaleDateString('de') + ' - ' + new Date(entry.time).toLocaleTimeString('de')
      const type = entry.type || null
      const operation = entry.operation || null
      const kickedBy = entry.kicked_by
        ? entry.kicked_by.split('.')[0]
        : null
      const invitedBy = entry.invited_by
        ? entry.invited_by.split('.')[0]
        : null
      const item = entry.item_id
        ? { id: entry.item_id, count: entry.count }
        : {}
      const coins = entry.coins || null
      //const upgradeAction = entry.action || null
      const upgradeId = entry.upgrade_id || null
      const motd = entry.motd || null

      // user invited
      if(type === 'invited') {
        return String().concat(time, ': ', invitedBy, ' hat ', username, ' in die Gilde eingeladen')
      }
      // user declined invitation
      if(type === 'invite_declined') {
        return String().concat(time, ': ', username, ' hat die Einladung abgelehnt')
      }
      // user accepted invitation
      if(type === 'joined') {
        return String().concat(time, ': ', username, ' ist beigetreten')
      }
      // user kicked
      if(type === 'kick' && username !== kickedBy) {
        return String().concat(time, ': ', username, ' wurde von ', kickedBy, ' aus der Gilde geworfen')
      }
      // user left guild
      if(type === 'kick' && username === kickedBy) {
        return String().concat(time, ': ', username, ' hat die Gilde verlassen')
      }
      // user withdraw coins
      if(type === 'stash' && operation === 'withdraw' && coins > 0) {
        return String().concat(time, ': ', username, ' hat ', coins, ' entnommen')
      }
      // user deposit coins
      if(type === 'stash' && operation === 'deposit' && coins > 0) {
        return String().concat(time, ': ', username, ' hat ', coins, ' eingezahlt')
      }
      // user withdraw item to stash
      if(type === 'stash' && operation === 'withdraw' && item.id > 0) {
        return String().concat(time, ': ', username, ' hat ', item.count, ' ', item.id, ' aus dem Lager entnommen')
      }
      // user deposit item to stash
      if(type === 'stash' && operation === 'deposit' && item.id > 0) {
        return String().concat(time, ': ', username, ' hat ', item.count, ' ', item.id, ' in das Lager eingezahlt')
      }
      // user deposit item to treasury, withdraw not possible
      if(type === 'treasury') {
        return String().concat(time, ': ', username, ' hat ', item.count, ' ', item.id, ' in die Schatzkammer eingezahlt')
      }
      // user rank changed
      if(type === 'rank_change') {
        return String().concat(time, ': ', changedBy, ' hat den Rang von ', username, ' von "', oldRank, '" zu "', newRank, '" geändert')
      }
      // motd changed
      if(type === 'motd') {
        return String().concat(time, ': ', username, ' hat die Gildenankündigung geändert: ', motd)
      }
      // guildhall upgrade
      if(type === 'upgrade') {
        return String().concat(time, ': ', username, ' hat ', upgradeId, ' beauftragt')
      }

      return JSON.stringify(entry)
    })

    return parsedLog
  }

  render() {
    return (
      <div className="content row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 col-xl-9 card">
          <h5 className="card-header">Gildeninfo</h5>
          <div className="card-body">
            {
              (this.state && this.state.guildlog)
                ? (
                  this.state.guildlog.map((entry, idx) => {
                    return (
                      <dl key={idx} className="row">
                        <dt key={idx + "dt"} className="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-4">{entry.split(':')[0]}:{entry.split(':')[1]}:{entry.split(':')[2]}</dt>
                        <dd key={idx + "dd"} className="col-xs-12 col-sm-12 col-md-12 col-lg-7 col-xl-8">{entry.split(':')[3]}</dd>
                      </dl>
                    )
                  })
                )
                : 'foo'
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Guildhall