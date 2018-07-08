import Fan from '../fan'

export default class TwoConcealedPungs extends Fan {
  get name() {
    return '双暗刻'
  }

  precondition() {
    let pungs = this.melds.filter(meld => meld.isConcealedPung())
    if (pungs.length === 2) {
      return pungs
    }
  }
}
