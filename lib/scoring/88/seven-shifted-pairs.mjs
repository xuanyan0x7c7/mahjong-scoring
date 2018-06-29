import Fan from "../fan"

export default class SevenShiftedPairs extends Fan {
  get name() {
    return '连七对'
  }

  precondition() {
    if (!this.isSevenPairs()) {
      return false
    }
    for (let i = 0; i < 6; ++i) {
      if (this.melds[i + 1].tile - this.melds[i].tile !== 1) {
        return false
      }
    }
    return this.melds[0].tile % 9 <= 2 && this.melds[0].tile < 27
  }
  
  get omittedFans() {
    return ['七对', '清一色', '门前清', '无字', '单调将']
  }
}