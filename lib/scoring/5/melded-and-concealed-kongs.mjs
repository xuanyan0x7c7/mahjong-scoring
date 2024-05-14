import Fan from '../fan'

export default class MeldedAndConcealedKongs extends Fan {
  get name() {
    return '明暗杠'
  }

  precondition() {
    let kongs = this.melds.filter(meld => meld.isKong())
    if (kongs.length === 2 && (kongs[0].isConcealedPung() ^ kongs[1].isConcealedPung())) {
      return kongs
    }
  }
}
