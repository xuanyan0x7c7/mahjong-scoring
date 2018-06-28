import Fan from "../fan"

export default class FourPureShiftedPungs extends Fan {
  get name() {
    return '一色四节高'
  }

  _process() {
    if (!this.isAllPungs()) {
      return
    }
    if (
      this.melds[1].tile < 27 && this.melds[1].tile % 9 < 6
      && this.melds[4].tile - this.melds[1].tile === 3
    ) {
      this.fans.push(this.name)
      this.addOmittedFans(['碰碰和'])
    }
  }
}