import React, { Component } from 'react'
import client from 'gw2api-client'
import config from './config'
import MOTD from './MOTD'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootstrapTable from 'react-bootstrap-table-next'

import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'

import moment from 'moment'
import 'moment/locale/de'

import uuidv1 from 'uuid/v1'

class Guildhall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guildlog: null
    }
  }

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
        //console.table(jsonResponse)
      })
  }

  _parseLog(rawLog) {
    if(!rawLog) return null

    let api = client()
    api.language('de')

    let parsedLog = rawLog.map((entry, idx) => {
      const username = entry.user
        ? entry.user.split('.')[0]
        : null
      const changedBy = entry.changed_by
        ? entry.changed_by.split('.')[0]
        : null
      const oldRank = entry.old_rank || null
      const newRank = entry.new_rank || null
      const time = new moment(entry.time).locale('de').format(config.datetimeformat)
      const type = entry.type || null
      const action = entry.action || null
      const activity = entry.activity || null
      const operation = entry.operation || null
      const kickedBy = entry.kicked_by
        ? entry.kicked_by.split('.')[0]
        : null
      const invitedBy = entry.invited_by
        ? entry.invited_by.split('.')[0]
        : null

      const item = entry.itemName ? entry : {}
      const coins = entry.coins || null

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
      // user move item
      if (type === 'stash' && operation === 'move' && item.id > 0) {
        retString = String().concat(username, ' hat ', item.itemName, ' verschoben')
      }
      // user withdraw item to stash
      if(type === 'stash' && operation === 'withdraw' && item.id > 0) {
        retString = String().concat(username, ' hat ', item.count, ' ', item.itemName, ' aus dem Lager entnommen')
      }
      // user deposit item to stash
      if(type === 'stash' && operation === 'deposit' && item.id > 0) {
        retString = String().concat(username, ' hat ', item.count, ' ', item.itemName, ' in das Lager eingezahlt')
      }
      // user deposit item to treasury, withdraw not possible
      if(type === 'treasury') {
        retString = String().concat(username, ' hat ', item.count, ' ', item.itemName, ' in die Schatzkammer eingezahlt')
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
        if(action === 'queued') {
          if(username) {
            retString = String().concat(username, ' hat ', entry.upgradeName, ' beauftragt')
          } else {
            retString = String().concat(entry.upgradeName, ' wurde beauftragt')
          }
        }
        if(action === 'completed' || action === 'complete') {
          retString = String().concat(entry.count + 'x ' + entry.itemName, ' fertig gestellt')
        }
      }
      // daily login activity, old reward, but still...
      if(type === 'influence' && activity === 'daily_login') {
        retString = String().concat('Einfluss für täglichen Login')
      }
      if(type === 'influence' && activity === 'gifted') {
        const total_participants = entry.total_participants
        const users = entry.participants.map(user => user.split('.')[0])
        const loginString = total_participants === 0 
          ? ' Gildenmitglied hat sich eingeloggt'
          : total_participants === 1 
            ? String().concat(total_participants, ' Gildenmitglied hat sich eingeloggt: ', users.join(','))
            : String().concat(total_participants, ' Gildenmitglieder haben sich eingeloggt: ', users.join(','))
        retString = loginString
      }

      if(retString !== '') {
        return {
          id: uuidv1(),
          date: time,
          sortDate: entry.time,
          logentry: retString,
          entryicon: entry.icon ? entry.icon : '',
          motd: motd ? motd : ''
        }
      } else {
        return {
          id: uuidv1(),
          date: JSON.stringify(entry),
          sortDate: '',
          logentry: JSON.stringify(entry),
          entryicon: '',
          motd: ''
        }
      }
    })

    return parsedLog
  }

  filterFunction(cell, row) {
    // just return type for filtering or searching.
    return cell.type;
  }

  render() {
    const columns = [
      {
        text: 'sort Date',
        dataField: 'sortDate',
        hidden: true,
        sort:true
      },
      {
        text: 'Datum',
        dataField: 'date',
        headerStyle: {
          width: '20%'
        }
      },
      {
        text: '',
        dataField: 'entryicon',
        headerStyle: {
          width: '10%'
        },
        formatter: (cell, row) => {
          return (
            <img src={cell} alt="" width="64"/>
          )
        }
      },
      {
        text: 'Logeintrag',
        dataField: 'logentry',
        headerStyle: {
          width: '70%'
        },
        filter: textFilter(),
        formatter: (cell, row) => {
          if(row.motd) {
            const userString = cell.split(':')[0]
            return (
              <div>
                {userString} &nbsp;
                <MOTD motd={row.motd} />
              </div>
            )
          } else {
            return cell
          }
        }
      }
    ]

    const defaultSortArray = [
      {
        dataField: 'sortDate',
        order: 'desc'
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
                  <BootstrapTable
                    keyField="id"
                    data={this.state.guildlog}
                    columns={columns}
                    pagination={paginationFactory()}
                    striped={true}
                    hover={true}
                    condensed={true}
                    defaultSorted={defaultSortArray}
                    filter={filterFactory()}
                  />
                )
                : 'Gildenlog nicht erreichbar...'
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Guildhall
