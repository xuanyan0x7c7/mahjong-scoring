import Fan from '../fan'

export default class ConcealedKong extends Fan {
  get name() {
    return '暗杠'
  }

  precondition() {
    let kongs = this.melds.filter(meld => meld.isKong())
    if (kongs.length === 1 && kongs[0].isConcealedPung()) {
      return kongs
    }
  }
}
