import Fan from "../fan"

export default class PureTripleChow extends Fan {
  get name() {
    return '一色三同顺'
  }

  _process() {
    if (!this.isPureNormalHand()) {
      return
    }
    let chows = []
    for (let index = 1; index <= 4; ++index) {
      if (this.melds[index].isChow()) {
        chows.push(this.melds[index])
      }
    }
    if (chows.length < 2) {
      return
    }
    if (chows.length === 3 && chows[0].middleTile === chows[2].middleTile) {
      this.combinations.push(...chows)
    } else {
      return
    }
    if (chows.length === 4) {
      if (chows[0].middleTile === chows[3].middleTile) {
        return
      }
      if (chows[0].middleTile === chows[2].middleTile) {
        this.combinations.push(...chows.slice(0, 3))
      } else if (chows[1].middleTile === chows[3].middleTile) {
        this.combinations.push(...chows.slice(1))
      } else {
        return
      }
    }
    this.fans.push(this.name)
  }
}