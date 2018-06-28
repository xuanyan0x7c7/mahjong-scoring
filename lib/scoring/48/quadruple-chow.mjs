import Fan from "../fan"
import Meld from "../../meld"

export default class QuadrupleChow extends Fan {
  get name() {
    return '一色四同顺'
  }

  _process() {
    if (!this.isPureNormalHand()) {
      return
    }
    if (this.melds[1].type !== Meld.CHOW || this.melds[4].type !== Meld.CHOW) {
      return
    }
    if (this.melds[1].middleTile === this.melds[4].middleTile) {
      this.fans.push(this.name)
      this.addOmittedFans(['四归一', '一般高'])
    }
  }
}