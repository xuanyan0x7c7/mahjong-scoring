import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class BigFourWinds extends Fan {
  get name() {
    return '大四喜'
  }

  _process() {
    if (!this.isAllPungs()) {
      return
    }
    for (let index = 1; index <= 4; ++index) {
      let meld = this.melds[index]
      if (!meld.isPungOrKong() || meld.tile < tilesMap.EAST_WIND || meld.tile > tilesMap.NORTH_WIND) {
        return
      }
    }
    this.fans.push(this.name)
    this.addOmittedFans(['三风刻', '碰碰和', '圈风刻', '门风刻', '幺九刻'])
  }
}