import Fan from "../fan"

export default class QuadrupleChow extends Fan {
  get name() {
    return '一色四同顺'
  }

  precondition() {
    return this.isPureNormalHand() && this.isAllChows() && this.melds[1].middleTile === this.melds[4].middleTile
  }

  get omittedFans() {
    return ['四归一']
  }
}