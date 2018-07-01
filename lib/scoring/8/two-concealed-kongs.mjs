import Fan from '../fan'

export default class TwoConcealedKongs extends Fan {
  get name() {
    return '双暗杠'
  }

  precondition() {
    return this.melds.filter(meld => meld.isConcealedPung() && meld.isKong()).length === 2
  }

  get omittedFans() {
    return ['双明杠', '双暗刻']
  }
}
