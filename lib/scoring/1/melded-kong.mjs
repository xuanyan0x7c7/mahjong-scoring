import Fan from '../fan'

export default class MeldedKong extends Fan {
  get name() {
    return '明杠'
  }

  precondition() {
    let kongs = this.melds.filter(meld => meld.isKong())
    if (kongs.length === 1 && !kongs[0].isConcealedPung()) {
      return kongs
    }
  }
}
