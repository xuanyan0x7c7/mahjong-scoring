import Fan from "../fan"

export default class ThreeConcealedPungs extends Fan {
  get name() {
    return '三暗刻'
  }

  precondition() {
    return this.melds.filter(meld => meld.isConcealedPung()).length === 3
  }
}