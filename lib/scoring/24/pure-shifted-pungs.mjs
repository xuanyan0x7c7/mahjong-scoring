import Fan from '../fan'

export default class PureShiftedPungs extends Fan {
  get name() {
    return '一色三节高'
  }

  precondition() {
    return this.isPureNormalHand()
  }

  _process() {
    let pungs = this.melds.filter(meld => meld.isPung())
    if (pungs.length < 3) {
      return false
    }
    if (pungs.length === 3) {
      if (PureShiftedPungs.isPureShiftedPungs(pungs[0].tile, pungs[2].tile)) {
        this.combinations.push(pungs)
      } else {
        return false
      }
    }
    if (pungs.length === 4) {
      if (PureShiftedPungs.isPureShiftedPungs(pungs[0].tile, pungs[2].tile)) {
        this.combinations.push(pungs.slice(0, 3))
      } else if (PureShiftedPungs.isPureShiftedPungs(pungs[1].tile, pungs[3].tile)) {
        this.combinations.push(pungs.slice(1))
      } else {
        return false
      }
    }
    return super._process()
  }

  static isPureShiftedPungs(tile1, tile3) {
    return tile3 - tile1 === 2 && Math.floor(tile1 / 9) === Math.floor(tile3 / 9) && !Fan.isHonor(tile1)
  }
}
