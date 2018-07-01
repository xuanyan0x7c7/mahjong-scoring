import Fan from '../fan'

export default class TwoConcealedPungs extends Fan {
  get name() {
    return '双暗刻'
  }

  precondition() {
    return this.melds.filter(meld => meld.isConcealedPung()).length === 2
  }
}
