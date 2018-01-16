import gw2apiClient from 'gw2api-client'
import cacheMemory from 'gw2api-client/build/cache/memory'
import autobind from 'auto-bind'

class Members {
  constructor(obj) {
    this.apiKey = obj.apiKey
      ? obj.apiKey
      : null
    this.guildId = obj.guildId
      ? obj.guildId
      : null

    if(!this.apiKey || !this.guildId) throw new Error('apikey or guildId missing')

    autobind(this)

    this.api = new gw2apiClient()
    this.api.cacheStorage(cacheMemory())
    this.api.language('de')
    this.api.authenticate(this.apiKey)
  }

  loadMembers() {
    this.api.guild(this.guildId).members().get().then((memberlist) => {
      this.members = memberlist
    })
  }

  getMembers() {
    return this.members
  }

  compareDate(a, b) {
    if (a.joined > b.joined) return 1
    else if (a.joined < b.joined) return -1
    else return 0
  }
}

export default Members