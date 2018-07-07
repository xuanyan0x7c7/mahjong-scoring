import Fan, { choose3From4 } from '../fan'

export default class MixedStraight extends Fan {
  get name() {
    return '花龙'
  }

  precondition() {
    return this.isPureNormalHand()
  }

  _process() {
    let chows = this.melds.filter(meld => meld.isChow())
    if (chows.length === 3) {
      if (isMixedStraight(chows)) {
        return this.combinationFound(chows)
      }
    }
    if (chows.length === 4) {
      for (let combination of choose3From4(chows)) {
        if (isMixedStraight(combination)) {
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

function isMixedStraight(chows) {
  let tiles = chows.map(chow => chow.middleTile)
  if (
    Math.floor(tiles[0] / 9) === Math.floor(tiles[1] / 9)
    || Math.floor(tiles[0] / 9) === Math.floor(tiles[2] / 9)
    || Math.floor(tiles[1] / 9) === Math.floor(tiles[2] / 9)
  ) {
    return false
  }
  let numbers = tiles.map(tile => tile % 9)
  return numbers[0] * numbers[1] * numbers[2] === 28
    && numbers[0] + numbers[1] + numbers[2] === 12
}
