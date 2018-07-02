import Fan from '../fan'

export default class FullyConcealedHand extends Fan {
  get name() {
    return '不求人'
  }

  precondition() {
    return this.isConcealedHand() && this.hand.isSelfDrawn
  }

  get omittedFans() {
    return ['门前清', '自摸']
  }
}
