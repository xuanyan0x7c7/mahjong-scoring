import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class AllFives extends Fan {
  get name() {
    return '全带五'
  }

  _process() {
    if (!this.isPureNormalHand()) {
      return
    }
    for (let meld of this.melds) {
      if (meld.isChow()) {
        if (!AllFives.isChowIncludesFive(meld)) {
          return
        }
      } else if (!AllFives.isPairOrPungIncludesFive(meld)) {
        return
      }
    }
    this.fans.push(this.name)
    this.addOmittedFans(['断幺'])
  }

  static isPairOrPungIncludesFive(meld) {
    return meld.tile % 9 === 4 && meld.tile < tilesMap.EAST_WIND
  }

  static isChowIncludesFive(chow) {
    return meld.tile % 9 === 3 || meld.tile % 9 === 4 || meld.tile % 9 === 5
  }
}