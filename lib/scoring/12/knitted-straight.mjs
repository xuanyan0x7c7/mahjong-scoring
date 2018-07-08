import Fan, { isHonor } from '../fan'

export default class KnittedStraight extends Fan {
  get name() {
    return '组合龙'
  }

  precondition() {
    if (this.isFullyKnitted() && isHonor(this.melds[0].voids[0])) {
      return this.melds
    } else if (this.isNormalHand() && !this.isPureNormalHand()) {
      return [this.melds[2]]
    }
  }
}
