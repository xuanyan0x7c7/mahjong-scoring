import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class LittleThreeDragons extends Fan {
  get name() {
    return '三风刻'
  }

  _process() {
    if (!this.isPureNormalHand()) {
      return
    }
    let windPungs = []
    for (let index = 1; index <= 4; ++index) {
      let meld = this.melds[index]
      if (meld.isPungOrKong() && meld.tile >= tilesMap.EAST_WIND && meld.tile <= tilesMap.NORTH_WIND) {
        windPungs.push(meld)
      }
    }
    if (windPungs.length === 3) {
      this.fans.push(this.name)
      for (let meld of windPungs) {
        this.addOmittedFans(['幺九刻'], meld)
      }
    }
  }
}