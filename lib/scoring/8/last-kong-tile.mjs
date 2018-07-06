import Fan from '../fan'

export default class LastKongTile extends Fan {
  get names() {
    return ['杠上开花', '抢杠和']
  }

  precondition() {
    return this.hand.isKong
  }

  _process() {
    if (this.hand.isSelfDrawn) {
      this.addFan(this.names[0])
      this.addOmittes(['自摸'])
    } else {
      this.addFan(this.names[1])
      this.addOmittes(['和绝张'])
    }
    return true
  }
}
