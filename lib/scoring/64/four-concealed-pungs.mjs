import Fan from '../fan'

export default class BigFourWinds extends Fan {
  get name() {
    return '四暗刻'
  }

  precondition() {
    let pungs = this.melds.filter(meld => meld.isConcealedPung())
    if (pungs.length === 4) {
      return pungs
    }
  }

  get omittedFans() {
    return ['碰碰和', '门前清']
  }
}
