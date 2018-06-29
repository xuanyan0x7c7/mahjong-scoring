import Fan from "../fan"

export default class LastKongTile extends Fan {
  get name() {
    return ['杠上开花', '抢杠和']
  }

  precondition() {
    return this.isKong
  }

  _process() {
    if (this.isSelfDrawn) {
      this.fans.push(this.name[0])
      this.addOmittes(['自摸'])
    } else {
      this.fans.push(this.name[1])
      this.addOmittes(['和绝张'])
    }
    return true
  }
}