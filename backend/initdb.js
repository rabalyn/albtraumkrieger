'use strict'

const config = require('./config')

import UpdateStore from './lib/gw2-updateStore'
const updateStore = new UpdateStore({
  apiKey: config.api.guildToken,
  guildId: config.api.guildId
})


updateStore.saveItems((err, list) => {
  console.log(err, list)
})

/*
updateStore.saveMembers((err, list) => {
  console.log(err, list)
})

updateStore.saveUpgrades((err, list) => {
  console.log(err, list)
})
*/