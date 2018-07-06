import Fan from '../fan'

export default class PureShiftedChows extends Fan {
  get names() {
    return ['清龙', '一色三步高']
  }

  precondition() {
    return this.isPureNormalHand()
  }

  _process() {
    let chows = this.melds.filter(meld => meld.isChow())
    let suitChows = null
    for (let suit = 0; suit < 3; ++suit) {
      suitChows = chows.filter(chow => Math.floor(chow.middleTile / 9) === suit)
      if (suitChows.length >= 3) {
        break
      }
    }
    if (!suitChows || suitChows.length < 3) {
      return false
    }
    let difference = null
    if (suitChows.length === 3) {
      difference = PureShiftedChows.getPureShiftedChowDifference(
        suitChows[0].middleTile, suitChows[1].middleTile, suitChows[2].middleTile
      )
      if (difference) {
        this.combinations.push(suitChows)
      } else {
        return false
      }
    }
    if (suitChows.length === 4) {
      let indexesList = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]]
      for (let indexes of indexesList) {
        difference = PureShiftedChows.getPureShiftedChowDifference(
          suitChows[indexes[0]].middleTile, suitChows[indexes[1]].middleTile, suitChows[indexes[2]].middleTile
        )
        if (difference) {
          this.combinations.push([suitChows[indexes[0]], suitChows[indexes[1]], suitChows[indexes[2]]])
          break
        }
      }
      if (!difference) {
        return false
      }
    }
    if (difference) {
      this.addFan(this.names[difference === 3 ? 0 : 1])
    }
    return true
  }

  static getPureShiftedChowDifference(chow1, chow2, chow3) {
    if (chow2 - chow1 === chow3 - chow2) {
      return chow2 - chow1
    } else {
      return null
    }
  }
}
