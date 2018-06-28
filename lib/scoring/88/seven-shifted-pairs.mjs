import Fan from "../fan"

export default class SevenShiftedPairs extends Fan {
  get name() {
    return '连七对'
  }

  _process() {
    if (!this.isSevenPairs()) {
      return
    }
    for (let i = 0; i < 6; ++i) {
      if (this.melds[i + 1] - this.melds[i] !== 1) {
        return
      }
    }
    if (this.melds[0].tile % 9 <= 2 && this.melds[0].tile < 27) {
      this.fans.push(this.name)
      this.addOmittedFans(['七对', '清一色', '单调将'])
    }
  }
}