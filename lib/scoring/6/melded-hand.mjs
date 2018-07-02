import Fan from '../fan'

export default class MeldedHand extends Fan {
  get name() {
    return '全求人'
  }

  precondition() {
    return this.hand.size === 1 && this.hand.concealedKongs.length === 0 && !this.hand.isSelfDrawn
  }

  get omittedFans() {
    return ['单调将']
  }
}
