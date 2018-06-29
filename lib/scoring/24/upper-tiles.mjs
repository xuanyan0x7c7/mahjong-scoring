import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class UpperTiles extends Fan {
  get name() {
    return '全大'
  }

  _process() {
    if (this.isAllInList([
      tilesMap.SEVEN_CHARACTERS, tilesMap.EIGHT_CHARACTERS, tilesMap.NINE_CHARACTERS,
      tilesMap.SEVEN_DOTS, tilesMap.EIGHT_DOTS, tilesMap.NINE_DOTS,
      tilesMap.SEVEN_BAMBOO, tilesMap.EIGHT_BAMBOO, tilesMap.NINE_BAMBOO
    ])) {
      this.fans.push(this.name)
      this.addOmittedFans(['大于五', '无字'])
    }
  }
}