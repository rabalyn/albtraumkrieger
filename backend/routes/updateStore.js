'use strict'

const config = require('../config')

import UpdateStore from '../lib/gw2-updateStore'
const updateStore = new UpdateStore({
  apiKey: config.api.guildToken,
  guildId: config.api.guildId
})

exports.loadMembersFromApi = (req, res) => {
  return res.send({
    "code": 200,
    "result": updateStore.saveMembers()
  })
}