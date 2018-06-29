import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class AllEvenPungs extends Fan {
  get name() {
    return '全双刻'
  }

  _process() {
    if (!this.isAllPungs()) {
      return
    }
    for (let meld of this.melds) {
      if (meld.tile >= tilesMap.EAST_WIND || meld.tile % 9 % 2 === 1) {
        return
      }
    }
    this.fans.push(this.name)
    this.addOmittedFans(['碰碰和', '断幺'])
  }
}