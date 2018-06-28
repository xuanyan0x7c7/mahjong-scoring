import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class AllTerminals extends Fan {
  get name() {
    return '清幺九'
  }

  _process() {
    if (this.isAllInList([
      tilesMap.ONE_CHARACTER, tilesMap.NINE_CHARACTERS,
      tilesMap.ONE_DOT, tilesMap.NINE_DOTS,
      tilesMap.ONE_BAMBOO, tilesMap.NINE_BAMBOO
    ])) {
      this.fans.push(this.name)
      this.addOmittedFans(['碰碰和', '全带幺', '幺九刻', '无字'])
    }
  }
}