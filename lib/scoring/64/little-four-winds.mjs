import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class LittleThreeDragons extends Fan {
  get name() {
    return '小四喜'
  }

  _process() {
    if (!this.isPureNormalHand()) {
      return
    } else if (this.melds[0].tile < tilesMap.EAST_WIND || this.melds[0].tile > tilesMap.NORTH_WIND) {
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
      this.addOmittedFans(['三风刻'])
      for (let meld of windPungs) {
        this.addOmittedFans(['幺九刻'], meld)
      }
    }
  }
}