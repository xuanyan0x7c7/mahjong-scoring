import Fan from '../fan'

export default class PureTripleChow extends Fan {
  get name() {
    return '一色三同顺'
  }

  precondition() {
    return this.isPureNormalHand()
  }

  _process() {
    let chows = this.melds.filter(meld => meld.isChow())
    if (chows.length < 3) {
      return false
    }
    if (chows.length === 3) {
      if (chows[0].middleTile === chows[2].middleTile) {
        this.combinations.push(chows)
      } else {
        return false
      }
    }
    if (chows.length === 4) {
      if (chows[0].middleTile === chows[3].middleTile) {
        return false
      }
      if (chows[0].middleTile === chows[2].middleTile) {
        this.combinations.push(chows.slice(0, 3))
      } else if (chows[1].middleTile === chows[3].middleTile) {
        this.combinations.push(chows.slice(1))
      } else {
        return false
      }
    }
    return super._process()
  }
}
