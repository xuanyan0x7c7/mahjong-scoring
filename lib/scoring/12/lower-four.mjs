import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class LowerFour extends Fan {
  get name() {
    return '小于五'
  }

  precondition() {
    return this.isAllInList([
      tilesMap.ONE_CHARACTER, tilesMap.TWO_CHARACTERS, tilesMap.THREE_CHARACTERS, tilesMap.FOUR_CHARACTERS,
      tilesMap.ONE_DOT, tilesMap.TWO_DOTS, tilesMap.THREE_DOTS, tilesMap.FOUR_DOTS,
      tilesMap.ONE_BAMBOO, tilesMap.TWO_BAMBOO, tilesMap.THREE_BAMBOO, tilesMap.FOUR_BAMBOO
    ])
  }
  
  get omittedFans() {
    return ['无字']
  }
}