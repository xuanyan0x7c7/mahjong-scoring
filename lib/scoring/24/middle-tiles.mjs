import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class LowerTiles extends Fan {
  get name() {
    return '全中'
  }

  precondition() {
    return this.isAllInList([
      tilesMap.FOUR_CHARACTERS, tilesMap.FIVE_CHARACTERS, tilesMap.SIX_CHARACTERS,
      tilesMap.FOUR_DOTS, tilesMap.FIVE_DOTS, tilesMap.SIX_DOTS,
      tilesMap.FOUR_BAMBOO, tilesMap.FIVE_BAMBOO, tilesMap.SIX_BAMBOO
    ])
  }
  
  get omittedFans() {
    return ['断幺', '无字']
  }
}