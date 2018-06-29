import Fan from "../fan"

export default class ConcealedKong extends Fan {
  get name() {
    return '暗杠'
  }

  precondition() {
    return this.melds.filter(meld => meld.isConcealedPung() && meld.isKong()).length === 1
  }

  get omittedFans() {
    return ['明杠']
  }
}