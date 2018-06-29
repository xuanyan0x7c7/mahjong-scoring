import Fan from "../fan"

export default class KnittedStraight extends Fan {
  get name() {
    return '全不靠'
  }

  _process() {
    if (this.melds[0].isFullyKnitted()) {
      if (this.melds[0].voids[0] < tilesMap.EAST_WIND) {
        return
      }
    } else if (!this.isNormalHand() || this.isPureNormalHand()) {
      return
    }
    this.fans.push(this.name)
    this.addOmittedFans(['五门齐', '门前清'])
  }
}