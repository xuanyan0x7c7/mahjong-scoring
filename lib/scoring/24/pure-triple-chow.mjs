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
    if (chows.length === 3) {
      if (chows[0].middleTile === chows[2].middleTile) {
        return this.combinationFound(chows)
      }
    }
    if (chows.length === 4) {
      if (chows[0].middleTile === chows[2].middleTile) {
        return this.combinationFound(chows.slice(0, 3))
      } else if (chows[1].middleTile === chows[3].middleTile) {
        return this.combinationFound(chows.slice(1))
      }
    }
  }

  combinationFound(combination) {
    this.addFan(this.name, combination)
    this.combinations.push(combination)
  }
}
