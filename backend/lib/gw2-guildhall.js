import gw2apiClient from 'gw2api-client'
import cacheMemory from 'gw2api-client/build/cache/memory'
import autobind from 'auto-bind'
import models from '../models'
import debug from 'debug'
const loginfo = debug('guildhall:info')
const logdebug = debug('guildhall:debug')
const logerror = debug('guildhall:error')
const Item = models.Item
const Upgrade = models.Upgrade

class Guildhall {
  constructor(obj) {
    this.apiKey = obj.apiKey
      ? obj.apiKey
      : null
    this.guildId = obj.guildId
      ? obj.guildId
      : null

    if (!this.apiKey || !this.guildId) throw new Error('apikey or guildId missing')

    autobind(this)

    this.api = new gw2apiClient()
    this.api.cacheStorage(cacheMemory())
    this.api.language('de')
    this.api.authenticate(this.apiKey)
  }

  loadUpgrades() {
    this.api.guild(this.guildId).upgrades().get().then((upgrades) => {
      this.guildupgrades =  upgrades
    })
  }

  loadGuildranks() {
    this.api.guild(this.guildId).ranks().get().then((guildranks) => {
      this.guildranks = guildranks
    })
  }

  loadStorage() {
    this.api.guild(this.guildId).storage().get().then((upgrades) => {
      this.guildStoredUpgrades = upgrades
    })
  }

  loadLog() {
    console.log('loading log...')
    this.api.guild(this.guildId).log().get().then((guildlog) => {
      let enrichedGuildlog = []
      guildlog.forEach((entry, idx) => {
        if(entry && entry.type === 'upgrade' && entry.action === 'queued' && !entry.user) {
          return
        }
        if(entry && entry.item_id) {
          const logitemid = entry.item_id
          const myItem = Item
          myItem.findOne({ 'itemid': logitemid }).exec((err, doc) => {
            if(err) {
              console.error('loadLog: ', err)
            } else {
              entry.itemName = doc.name
              entry.description = doc.description
              entry.icon = doc.icon
              enrichedGuildlog.push(entry)
            }
          })
        } else if(entry && entry.upgrade_id) {
          const upgrade_id = entry.upgrade_id
          Upgrade.findOne({ 'upgradeid': upgrade_id}).exec((err, doc) => {
            if(err) {
              console.error('loadLog: ', err)
            } else {
              entry.upgradeName = doc.name
              entry.description = doc.description
              entry.icon = doc.icon
              enrichedGuildlog.push(entry)
            }
          })
        } else {
          enrichedGuildlog.push(entry)
        }
      })
      this.guildlog = enrichedGuildlog
      console.log('log loaded', new Date())
    }).catch(reason => {
      console.error(reason)
    })
  }

  getLog() {
    console.log('get guildlog')
    return this.guildlog
  }

  loadItemstats(itemIds) {
    this.api.items().get(itemIds).then((itemstats) => {
      this.itemstats = itemstats
    }).catch(reason => {
      console.error('loadItemstats: ' + reason)
    })
  }

  getItemstats() {
    return this.itemstats
  }
}

export default Guildhall
