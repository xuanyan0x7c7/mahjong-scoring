import Fan from '../fan'

export default class ConcealedKong extends Fan {
  get name() {
    return '暗杠'
  }

  precondition() {
    let kongs = this.melds.filter(meld => meld.isConcealedPung() && meld.isKong())
    if (kongs.length === 1) {
      return kongs
    }
  }

  get omittedFans() {
    return ['明杠']
  }
}
