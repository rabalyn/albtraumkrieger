'use strict'

import gw2apiClient from 'gw2api-client'
import cacheMemory from 'gw2api-client/build/cache/memory'
import async from 'async'
import autobind from 'auto-bind'
import models from '../models'
import debug from 'debug'
const logdebug = debug('updateStore:debug')
const logerror = debug('updateStore:error')

const User = models.User
const Item = models.Item
const Upgrade = models.Upgrade

class UpdateStore {
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

  cleanMembers(callback) {
    logdebug('cleanMembers')
    User.remove((err, doc) => {
      if(err) {
        logerror('cleanMembers: %O', err)
      } else {
        logdebug(doc)
      }

      callback(err, doc)
    })
  }

  loadMembersFromApi(callback) {
    logdebug('loadMembersFromApi')
    this.api.guild(this.guildId).members().get().then((memberlist) => {
      memberlist.forEach(member => {
        logdebug('loadMembersFromApi member: %O', member)
        const userdetails = {
          accountid: member.name,
          joinedAt: member.joined,
          rank: member.rank
        }

        User.register(new User({username: member.name}), member.name, (err, user) => {
          if(err) {
            logerror('User register failed: %O', err)
          }

          User.findOneAndUpdate(
            { username: member.name }, // filter
            userdetails,
            { upsert: true, new: true}, // upsert: update or create new, new: return updated document
            (err, user) => {
              if(err) {
                logerror('findOneAndUpdate member failed: %O', err)
              } else {
                logdebug('user: %o', user)
              }
            }
          )
        })
      })

      callback(null, memberlist)
    }).catch(reason => {
      logerror('loadMembersFromApi: %O', reason)
    })
  }

  saveMembers() {
    async.waterfall([
      //this.cleanMembers,
      this.loadMembersFromApi
    ])
  }

  cleanItems(callback) {
    Item.remove((err, doc) => {
      if(err) {
        logerror('cleanItems: %O', err)
      } else {
        logdebug('cleanItems: %O', doc)
      }

      callback(err, doc)
    })
  }

  loadItemsFromApi(callback) {
    logdebug('loadItemsFromApi')
    this.api.items().all().then((itemlist) => {
      async.each(itemlist, (item, cb) => {
        logdebug('got item %o', item)
        const itemDetails = {
          itemid: item.id,
          name: item.name,
          description: item.description,
          type: item.type,
          level: item.level,
          rarity: item.rarity,
          vendor_value: item.vendor_value,
          default_skin: item.default_skin,
          chat_link: item.chat_link,
          icon: item.icon
        }

        const newItem = new Item(itemDetails)
        newItem.save((err, res) => {
          if(err) {
            logerror('loadItemsFromApi: %O', err)
          } else {
            //logdebug('saved item: %O', res)
          }

          cb()
        })
      }, (err) => {
        if(err) {
          logerror('loadItemsFromApi: %O', err)
        } else {
          logdebug('loadItemsFromApi: loaded')
        }

        logdebug('calling callback')
        callback(err, true)
      })
    }).catch(reason => {
      logerror('loadItemsFromApi: %O', reason)
    })
  }

  saveItems() {
    async.waterfall([
      this.cleanItems,
      this.loadItemsFromApi
    ])
  }

  cleanUpgrades(callback) {
    Upgrade.remove((err, doc) => {
      if (err) {
        logerror('cleanUpgrades: %O', err)
      } else {
        logdebug('cleanUpgrades: %O', doc)
      }

      callback(err, doc)
    })
  }

  loadGuildhallUpgradesFromApi(callback) {
    this.api.guild().upgrades().all().then((upgradelist) => {
      upgradelist.forEach(upgrade => {
        const upgradeDetails = {
          upgradeid: upgrade.id,
          name: upgrade.name,
          description: upgrade.description,
          icon: upgrade.icon,
          type: upgrade.type
        }

        const newUpgrade = new Upgrade(upgradeDetails)
        newUpgrade.save((err, res) => {
          if (err) {
            logerror('loadGuildhallUpgradesFromApi: %O', err)
          } else {
            logdebug('saved upgrade: %O', res)
          }
        })
      })

      callback(null, upgradelist)
    }).catch(reason => {
      logerror('loadGuildhallUpgradesFromApi: %O', reason)
    })
  }

  saveUpgrades() {
    async.waterfall([
      this.cleanUpgrades,
      this.loadGuildhallUpgradesFromApi
    ])
  }
}

export default UpdateStore
