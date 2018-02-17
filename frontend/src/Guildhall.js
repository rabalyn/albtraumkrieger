import React, { Component } from 'react'
import ReactTable from 'react-table'
import config from './config'

class Guildhall extends Component {
  componentDidMount() {
    const hallurl = config.apiurlbase + '/hall'
    fetch(hallurl)
      .then(response => response.json())
      .then(jsonResponse => {
        const hallInfo = jsonResponse.result
        const parsedLog = this._parseLog(hallInfo)
        this.setState({
          guildlog: parsedLog
        })
      })

    const itemsurl = config.apiurlbase + '/items'
    fetch(itemsurl)
      .then(response => response.json())
      .then(jsonResponse => {
        console.table(jsonResponse)
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

      let retString = ''

      // user invited
      if(type === 'invited') {
        retString = String().concat(invitedBy, ' hat ', username, ' in die Gilde eingeladen')
      }
      // user declined invitation
      if(type === 'invite_declined') {
        retString = String().concat(username, ' hat die Einladung abgelehnt')
      }
      // user accepted invitation
      if(type === 'joined') {
        retString = String().concat(username, ' ist beigetreten')
      }
      // user kicked
      if(type === 'kick' && username !== kickedBy) {
        retString = String().concat(username, ' wurde von ', kickedBy, ' aus der Gilde geworfen')
      }
      // user left guild
      if(type === 'kick' && username === kickedBy) {
        retString = String().concat(username, ' hat die Gilde verlassen')
      }
      // user withdraw coins
      if(type === 'stash' && operation === 'withdraw' && coins > 0) {
        retString = String().concat(username, ' hat ', coins, ' entnommen')
      }
      // user deposit coins
      if(type === 'stash' && operation === 'deposit' && coins > 0) {
        retString = String().concat(username, ' hat ', coins, ' eingezahlt')
      }
      // user withdraw item to stash
      if(type === 'stash' && operation === 'withdraw' && item.id > 0) {
        retString = String().concat(username, ' hat ', item.count, ' ', item.id, ' aus dem Lager entnommen')
      }
      // user deposit item to stash
      if(type === 'stash' && operation === 'deposit' && item.id > 0) {
        retString = String().concat(username, ' hat ', item.count, ' ', item.id, ' in das Lager eingezahlt')
      }
      // user deposit item to treasury, withdraw not possible
      if(type === 'treasury') {
        retString = String().concat(username, ' hat ', item.count, ' ', item.id, ' in die Schatzkammer eingezahlt')
      }
      // user rank changed
      if(type === 'rank_change') {
        retString = String().concat(changedBy, ' hat den Rang von ', username, ' von "', oldRank, '" zu "', newRank, '" geändert')
      }
      // motd changed
      if(type === 'motd') {
        retString = String().concat(username, ' hat die Gildenankündigung geändert: ', motd)
      }
      // guildhall upgrade
      if(type === 'upgrade') {
        retString = String().concat(username, ' hat ', upgradeId, ' beauftragt')
      }

      if(retString !== '') {
        return {
          date: time,
          logentry: retString
        }
      } else {
        return {
          date: JSON.stringify(entry),
          logentry: JSON.stringify(entry)
        }
      }
    })

    return parsedLog
  }

  
  render() {
    const columns = [
      {
        Header: 'Datum',
        accessor: 'date',
        width: 230,
        style: {
          "white-space": "normal"
        }
      },
      {
        Header: 'Logeintrag',
        accessor: 'logentry',
        maxWidth: 1900,
        style: {
          "white-space": "normal"
        }
      }
    ]

    return (
      <div className="content row justify-content-center">
        <div className="col-12 card">
          <h5 className="card-header">Gildeninfo</h5>
          <div className="card-body">
            {
              (this.state && this.state.guildlog)
                ? (
                  <ReactTable 
                    data={this.state.guildlog}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    previousText="zurück"
                    nextText="vor"
                    loadingText="Lädt..."
                    noDataText="Keine Einträge gefunden"
                    pageText="Seite"
                    ofText="von"
                    rowsText="Zeilen"
                  />
                )
                : 'foo'
              /*
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
                */
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Guildhall