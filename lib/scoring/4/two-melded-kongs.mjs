import Fan from '../fan'

export default class TwoMeldedKongs extends Fan {
  get name() {
    return '双明杠'
  }

  precondition() {
    let kongs = this.melds.filter(meld => meld.isKong())
    if (kongs.length === 2 && kongs.every(kong => !kong.isConcealedPung())) {
      return kongs
    }
  }
}
