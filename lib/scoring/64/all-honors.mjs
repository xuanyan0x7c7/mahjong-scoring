import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class AllHonors extends Fan {
  get name() {
    return '字一色'
  }

  _process() {
    if (this.isAllInList([
      tilesMap.EAST_WIND, tilesMap.SOUTH_WIND, tilesMap.WEST_WIND, tilesMap.NORTH_WIND,
      tilesMap.READ_DRAGON, tilesMap.GREEN_DRAGON, tilesMap.WHITE_DRAGON
    ])) {
      this.fans.push(this.name)
      this.addOmittedFans(['碰碰和', '全带幺', '幺九刻'])
    }
  }
}