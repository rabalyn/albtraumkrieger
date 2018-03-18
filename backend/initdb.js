'use strict'

const config = require('./config')

import UpdateStore from './lib/gw2-updateStore'
const updateStore = new UpdateStore({
  apiKey: config.api.guildToken,
  guildId: config.api.guildId
})


updateStore.saveItems((err, data) => {
  console.log(err, data)
})
/*
updateStore.saveMembers((err, data) => {
  console.log(err, data)
})

updateStore.saveUpgrades((err, data) => {
  console.log(err, data)
})
*/
