import Fan, { choose3From4 } from '../fan'

export default class MixedShiftedChows extends Fan {
  get name() {
    return '三色三步高'
  }

  precondition() {
    return this.isPureNormalHand()
  }

  _process() {
    let chows = this.melds.filter(meld => meld.isChow())
    if (chows.length === 3) {
      if (isMixedShiftedChows(chows)) {
        return this.combinationFound(chows)
      }
    }
    if (chows.length === 4) {
      for (let combination of choose3From4(chows)) {
        if (isMixedShiftedChows(combination)) {
          return this.combinationFound(combination)
        }
      }
    }
  }

  combinationFound(combination) {
    this.addFan(this.name, combination)
    this.combinations.push(combination)
  }
}

function isMixedShiftedChows(chows) {
  let tiles = chows.map(chow => chow.middleTile)
  if (
    Math.floor(tiles[0] / 9) === Math.floor(tiles[1] / 9)
    || Math.floor(tiles[0] / 9) === Math.floor(tiles[2] / 9)
    || Math.floor(tiles[1] / 9) === Math.floor(tiles[2] / 9)
  ) {
    return false
  }
  return Math.abs((tiles[0] % 9 - tiles[1] % 9) * (tiles[0] % 9 - tiles[2] % 9) * (tiles[1] % 9 - tiles[2] % 9)) === 2
}
