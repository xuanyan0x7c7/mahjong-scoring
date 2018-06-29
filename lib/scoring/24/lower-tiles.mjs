import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class LowerTiles extends Fan {
  get name() {
    return '全小'
  }

  _process() {
    if (this.isAllInList([
      tilesMap.ONE_CHARACTER, tilesMap.TWO_CHARACTERS, tilesMap.THREE_CHARACTERS,
      tilesMap.ONE_DOT, tilesMap.TWO_DOTS, tilesMap.THREE_DOTS,
      tilesMap.ONE_BAMBOO, tilesMap.TWO_BAMBOO, tilesMap.THREE_BAMBOO
    ])) {
      this.fans.push(this.name)
      this.addOmittedFans(['小于五', '无字'])
    }
  }
}