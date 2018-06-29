import Fan from "../fan"

export default class KnittedStraight extends Fan {
  get name() {
    return '全不靠'
  }

  _process() {
    return (this.isFullyKnitted() && Fan.isHonor(this.melds[0].voids[1]))
      || (this.isNormalHand() && !this.isPureNormalHand())
  }

  get omittedFans() {
    return ['五门齐', '门前清']
  }
}