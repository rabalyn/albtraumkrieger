'use strict'

const config = require('../config')
import Storage from './Storage'
const storage = new Storage(config)
storage.checkConnection()

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
gw2hall.loadItemstats()

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