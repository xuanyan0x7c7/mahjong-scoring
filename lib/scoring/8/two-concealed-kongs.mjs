import Fan from '../fan'

export default class TwoConcealedKongs extends Fan {
  get name() {
    return '双暗杠'
  }

  precondition() {
    let kongs = this.melds.filter(meld => meld.isConcealedPung() && meld.isKong())
    if (kongs.length === 2) {
      return kongs
    }
  }

  get omittedFans() {
    return ['双明杠', '双暗刻']
  }
}
