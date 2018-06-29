import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class UpperFour extends Fan {
  get name() {
    return '大于五'
  }

  _process() {
    if (this.isAllInList([
      tilesMap.SIX_CHARACTERS, tilesMap.SEVEN_CHARACTERS, tilesMap.EIGHT_CHARACTERS, tilesMap.NINE_CHARACTERS,
      tilesMap.SIX_DOTS, tilesMap.SEVEN_DOTS, tilesMap.EIGHT_DOTS, tilesMap.NINE_DOTS,
      tilesMap.SIX_BAMBOO, tilesMap.SEVEN_BAMBOO, tilesMap.EIGHT_BAMBOO, tilesMap.NINE_BAMBOO
    ])) {
      this.fans.push(this.name)
      this.addOmittedFans(['无字'])
    }
  }
}