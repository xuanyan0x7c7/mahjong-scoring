import Fan from "../fan"

export default class MeldedKong extends Fan {
  get name() {
    return '明杠'
  }

  precondition() {
    return this.melds.filter(meld => meld.isKong()).length === 1
  }
}