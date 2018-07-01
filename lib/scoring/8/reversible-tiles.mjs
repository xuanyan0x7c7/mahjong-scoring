import Fan from '../fan'
import { tilesMap } from '../../utils'

export default class ReversibleTiles extends Fan {
  get name() {
    return '推不倒'
  }

  precondition() {
    return this.isAllInList([
      tilesMap.ONE_DOT, tilesMap.TWO_DOTS, tilesMap.THREE_DOTS, tilesMap.FOUR_DOTS,
      tilesMap.FIVE_DOTS, tilesMap.EIGHT_DOTS, tilesMap.NINE_DOTS,
      tilesMap.TWO_BAMBOO, tilesMap.FOUR_BAMBOO, tilesMap.FIVE_BAMBOO,
      tilesMap.SIX_BAMBOO, tilesMap.EIGHT_BAMBOO, tilesMap.NINE_BAMBOO,
      tilesMap.WHITE_DRAGON
    ])
  }
  
  get omittedFans() {
    return ['缺一门']
  }
}
