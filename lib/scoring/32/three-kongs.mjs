import Fan from "../fan"
import Meld from "../../meld"

export default class ThreeKongs extends Fan {
  get name() {
    return '三杠'
  }

  _process() {
    if (!this.isPureNormalHand()) {
      return
    }
    let kongCount = 0
    for (let index = 1; index <= 4; ++index) {
      if (this.melds[index].isKong()) {
        ++kongCount
      }
    }
    if (kongCount === 3) {
      this.fans.push(this.name)
    }
  }
}