import Fan, { isHonor, choose3From4 } from '../fan'

export default class MixedShiftedPungs extends Fan {
  get name() {
    return '三色三节高'
  }

  precondition() {
    return this.isPureNormalHand()
  }

  _process() {
    let pungs = this.melds.filter(meld => meld.isPung() && !isHonor(meld.tile))
    if (pungs.length === 3) {
      if (isMixedShiftedPungs(pungs)) {
        return this.combinationFound(pungs)
      }
    }
    if (pungs.length === 4) {
      for (let combination of choose3From4(pungs)) {
        if (isMixedShiftedPungs(combination)) {
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

function isMixedShiftedPungs(pungs) {
  let tiles = pungs.map(pung => pung.tile)
  if (
    Math.floor(tiles[0] / 9) === Math.floor(tiles[1] / 9)
    || Math.floor(tiles[0] / 9) === Math.floor(tiles[2] / 9)
    || Math.floor(tiles[1] / 9) === Math.floor(tiles[2] / 9)
  ) {
    return false
  }
  return Math.abs((tiles[0] % 9 - tiles[1] % 9) * (tiles[0] % 9 - tiles[2] % 9) * (tiles[1] % 9 - tiles[2] % 9)) === 2
}
