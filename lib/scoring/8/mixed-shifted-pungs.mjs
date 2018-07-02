import Fan from '../fan'

export default class MixedShiftedPungs extends Fan {
  get name() {
    return '三色三节高'
  }

  precondition() {
    return this.isPureNormalHand()
  }

  _process() {
    let pungs = this.melds.filter(meld => meld.isPung() && !Fan.isHonor(meld.tile))
    if (pungs.length < 3) {
      return false
    } 
    if (pungs.length === 3) {
      if (MixedShiftedPungs.isMixedShiftedPungs(pungs[0].tile, pungs[1].tile, pungs[2].tile)) {
        this.combinations.push(pungs)
      } else {
        return false
      }
    }
    if (pungs.length === 4) {
      const indexesList = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]]
      let ok = false
      for (let indexes of indexesList) {
        if (MixedShiftedPungs.isMixedShiftedPungs(
          pungs[indexes[0]].tile, pungs[indexes[1]].tile, pungs[indexes[2]].tile
        )) {
          this.combinations.push([pungs[indexes[0]], pungs[indexes[1]], pungs[indexes[2]]])
          ok = true
          break
        }
      }
      if (!ok) {
        return false
      }
    }
    super._process()
    return true
  }

  static isMixedShiftedPungs(pung1, pung2, pung3) {
    if (
      Math.floor(pung1 / 9) === Math.floor(pung2 / 9)
      || Math.floor(pung1 / 9) === Math.floor(pung3 / 9)
      || Math.floor(pung2 / 9) === Math.floor(pung3 / 9)
    ) {
      return false
    }
    return Math.abs((pung1 % 9 - pung2 % 9) * (pung1 % 9 - pung3 % 9) * (pung2 % 9 - pung3 % 9)) === 2
  }
}
