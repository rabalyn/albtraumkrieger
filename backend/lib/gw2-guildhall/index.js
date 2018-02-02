import gw2apiClient from 'gw2api-client'
import cacheMemory from 'gw2api-client/build/cache/memory'
import autobind from 'auto-bind'

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
      //console.table(upgrades)
      this.guildupgrades =  upgrades
    })
  }

  loadGuildranks() {
    this.api.guild(this.guildId).ranks().get().then((guildranks) => {
      //console.table(guildranks)
      this.guildranks = guildranks
    })
  }

  loadStorage() {
    this.api.guild(this.guildId).storage().get().then((upgrades) => {
      //console.table(upgrades)
      this.guildStoredUpgrades = upgrades
    })
  }

  loadLog() {
    this.api.guild(this.guildId).log().get().then((guildlog) => {
      //console.table(upgrades)
      this.guildlog = guildlog
    })
  }

  getLog() {
    return this.guildlog
  }

  loadItemstats(itemIds) {
    this.api.items().get(itemIds).then((itemstats) => {

      console.log(itemstats)
      this.itemstats = itemstats
    })
  }

  getItemstats() {
    return this.itemstats
  }
}

export default Guildhall