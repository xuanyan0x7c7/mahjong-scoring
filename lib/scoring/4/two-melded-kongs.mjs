import Fan from '../fan'

export default class TwoMeldedKongs extends Fan {
  get name() {
    return '双明杠'
  }

  precondition() {
    return this.melds.filter(meld => meld.isKong()).length === 2
  }
}
