'use strict'

const config = require('../config')

import Gw2members from '../lib/gw2-members'
const gw2members = new Gw2members({
  apiKey: config.api.guildToken,
  guildId: config.api.guildId
})

import Gw2hall from '../lib/gw2-guildhall'
const gw2hall = new Gw2hall({
  apiKey: config.api.guildToken,
  guildId: config.api.guildId
})

gw2members.loadMembers()
gw2hall.loadLog()
//gw2hall.loadItemstats()

import schedule from 'node-schedule'

const j = schedule.scheduleJob('1 3 * * * *', () => {
  console.log('loading log at ', new Date())
  gw2hall.loadLog()
  gw2members.loadMembers()
})

exports.members = (req, res) => {
  return res.send({
    "code": 200,
    "result": gw2members.getMembers()
  })
}

exports.guildhall = (req, res) => {
  return res.send({
    "code": 200,
    "result": gw2hall.getLog()
  })
}

exports.items = (req, res) => {
  return res.send({
    "code": 200,
    "result": gw2hall.getItemstats()
  })
}

async function _findOrSaveItem(entry) {
  if (entry.item_id && entry.count) {
    await that.api.items().get(entry.item_id).then(item => {
      Item.findOrCreate({
        where: {
          item_id: item.item_id
        },
        defaults: {
          item_id: item.item_id,
          name: item.name,
          description: item.description,
          type: item.type,
          level: item.level,
          rarity: item.rarity,
          vendor_value: item.vendor_value,
          chat_link: item.chat_link,
          icon: item.icon
        }
      })
    }).catch(reason => console.log(reason))
  }

  return { id: '', count: 0 }
}
