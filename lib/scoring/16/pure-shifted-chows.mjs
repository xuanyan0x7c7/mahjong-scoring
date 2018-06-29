import Fan from "../fan"

export default class PureShiftedChows extends Fan {
  get name() {
    return ['清龙', '一色三步高']
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
    let suitChows = null
    for (let suit = 0; suit < 3; ++suit) {
      suitChows = chows.filter(chow => Math.floor(chow.middleTile / 9) === suit)
      if (suitChows.length >= 3) {
        break
      }
    }
    if (!suitChows || suitChows.length < 3) {
      return
    }
    let difference = null
    if (suitChows.length === 3) {
      difference = PureShiftedChows.getPureShiftedChowDifference(
        suitChows[0], suitChows[1], suitChows[2]
      )
      if (!difference) {
        return
      }
      this.combinations.push(...suitChows)
    }
    if (suitChows.length === 4) {
      let indexesList = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]]
      for (let indexes of indexesList) {
        difference = PureShiftedChows.getPureShiftedChowDifference(
          suitChows[indexes[0]], suitChows[indexes[1]], suitChows[indexes[2]]
        )
        if (difference) {
          this.combinations.push(suitChows[indexes[0]], suitChows[indexes[1]], suitChows[indexes[2]])
          break
        }
      }
    }
    if (difference) {
      this.fans.push(this.name[difference === 3 ? 0 : 1])
    }
  }

  static getPureShiftedChowDifference(chow1, chow2, chow3) {
    if (chow2.middleTile - chow1.middleTile === chow3.middleTile - chow2.middleTile) {
      return chow2.middleTile - chow1.middleTile
    } else {
      return null
    }
  }
}