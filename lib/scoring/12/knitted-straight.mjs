import Fan from '../fan'

export default class KnittedStraight extends Fan {
  get name() {
    return '组合龙'
  }

  precondition() {
    return (this.isFullyKnitted() && Fan.isHonor(this.melds[0].voids[0]))
      || (this.isNormalHand() && !this.isPureNormalHand())
  }
}
