import Fan from '../fan'

export default class ThreeConcealedPungs extends Fan {
  get name() {
    return '三暗刻'
  }

  precondition() {
    let pungs = this.melds.filter(meld => meld.isConcealedPung())
    if (pungs.length === 3) {
      return pungs
    }
  }
}
