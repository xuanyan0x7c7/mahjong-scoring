import Fan from "../fan"

export default class ConcealedHand extends Fan {
  get name() {
    return '门前清'
  }

  precondition() {
    return this.isConcealedHand() && !this.isSelfDrawn
  }
}