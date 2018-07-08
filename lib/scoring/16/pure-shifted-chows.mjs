import Fan, { choose3From4 } from '../fan'

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
      return
    }
    if (suitChows.length === 3) {
      let difference = getPureShiftedChowDifference(suitChows)
      if (difference) {
        return this.combinationFound(difference, suitChows)
      }
    }
    if (suitChows.length === 4) {
      for (let combination of choose3From4(suitChows)) {
        let difference = getPureShiftedChowDifference(combination)
        if (difference) {
          return this.combinationFound(difference, combination)
        }
      }
    }
  }

  combinationFound(difference, combination) {
    this.addFan(this.names[difference === 3 ? 0 : 1], combination)
    this.combinations.push(combination)
  }
}

function getPureShiftedChowDifference(chows) {
  let tiles = chows.map(chow => chow.middleTile)
  if (tiles[1] - tiles[0] === tiles[2] - tiles[1]) {
    return tiles[1] - tiles[0]
  } else {
    return null
  }
}
