import Fan from "../fan"
import Meld from "../../meld"

export default class FourPureShiftedChows extends Fan {
  get name() {
    return '一色四步高'
  }

  _process() {
    if (!this.isPureNormalHand() || !this.isAllChows()) {
      return
    }
    let difference = this.melds[2].middleTile - this.melds[1].middleTile
    if (difference !== 1 && difference !== 2) {
      return
    }
    if (
      difference === 1 && this.melds[1].middleTile % 9 >= 5
      || (difference === 2 && this.melds[1].middleTile !== 1)
    ) {
      return
    }
    if (
      this.melds[3].middleTile - this.melds[2].middleTile === difference
      && this.melds[4].middleTile - this.melds[3].middleTile === difference
    ) {
      this.fans.push(this.name)
      this.addOmittedFans(['连六', '老少副'])
    }
  }
}