import Fan, { isHonor } from '../fan'

export default class PureShiftedPungs extends Fan {
  get name() {
    return '一色三节高'
  }

  precondition() {
    return this.isPureNormalHand()
  }

  _process() {
    let pungs = this.melds.filter(meld => meld.isPung())
    if (pungs.length === 3) {
      if (isPureShiftedPungs(pungs[0], pungs[2])) {
        return this.combinationFound(pungs)
      }
    }
    if (pungs.length === 4) {
      if (isPureShiftedPungs(pungs[0], pungs[2])) {
        return this.combinationFound(pungs.slice(0, 3))
      } else if (isPureShiftedPungs(pungs[1], pungs[3])) {
        return this.combinationFound(pungs.slice(1))
      }
    }
  }

  combinationFound(combination) {
    this.addFan(this.name, combination)
    this.combinations.push(combination)
  }
}

function isPureShiftedPungs(pung1, pung3) {
  let tile1 = pung1.tile
  let tile3 = pung3.tile
  return tile3 - tile1 === 2 && Math.floor(tile1 / 9) === Math.floor(tile3 / 9) && !isHonor(tile1)
}
