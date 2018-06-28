import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class BigFourWinds extends Fan {
  get name() {
    return '大四喜'
  }

  _process() {
    if (this.melds.length !== 5) {
      return
    }
    if (
      this.melds[1].isPungOrKong() && this.melds[1].tile === tilesMap.EAST_WIND
      && this.melds[2].isPungOrKong() && this.melds[2].tile === tilesMap.SOUTH_WIND
      && this.melds[3].isPungOrKong() && this.melds[3].tile === tilesMap.WEST_WIND
      && this.melds[4].isPungOrKong() && this.melds[4].tile === tilesMap.NORTH_WIND
    ) {
      this.fans.push(this.name)
      this.addOmittedFans(['三风刻', '碰碰和', '圈风刻', '门风刻', '幺九刻'])
    }
  }
}