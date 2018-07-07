import Fan from '../fan'

export default class FourPureShiftedPungs extends Fan {
  get name() {
    return '一色四节高'
  }

  precondition() {
    if (
      this.isAllPungs()
      && this.melds[1].tile < 27 && this.melds[1].tile % 9 < 6
      && this.melds[4].tile - this.melds[1].tile === 3
    ) {
      return this.melds.slice(1)
    }
  }

  get omittedFans() {
    return ['一色三节高', '碰碰和']
  }
}
