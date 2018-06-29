import Fan from "../fan"

export default class ThreeKongs extends Fan {
  get name() {
    return '三杠'
  }

  precondition() {
    return this.melds.filter(meld => meld.isKong()).length === 3
  }
}