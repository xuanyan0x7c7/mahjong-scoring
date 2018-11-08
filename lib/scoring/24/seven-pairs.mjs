import Fan from '../fan'

export default class SevenPairs extends Fan {
  get name() {
    return '七对'
  }

  precondition() {
    if (this.isSevenPairs()) {
      return this.melds
    }
  }

  get omittedFans() {
    return ['不求人', '门前清', '单钓将']
  }
}
