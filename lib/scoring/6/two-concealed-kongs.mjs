import Fan from '../fan'

export default class TwoConcealedKongs extends Fan {
  get name() {
    return '双暗杠'
  }

  precondition() {
    let kongs = this.melds.filter(meld => meld.isKong())
    if (kongs.length === 2 && kongs.every(kong => kong.isConcealedPung())) {
      return kongs
    }
  }

  get omittedFans() {
    return ['双暗刻']
  }
}
