import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class TriplePung extends Fan {
  get name() {
    return '三同刻'
  }

  _process() {
    if (!this.isPureNormalHand()) {
      return
    }
    let pungNumbers = new Array(9).fill(0)
    for (let meld of this.melds) {
      if (meld.isPungOrKong() && meld.tile < tilesMap.EAST_WIND) {
        ++pungNumbers[meld.tile % 9]
      }
    }
    for (let count of pungNumbers) {
      if (count === 3) {
        this.fans.push(this.name)
        return
      }
    }
  }
}