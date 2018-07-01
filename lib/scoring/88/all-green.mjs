import Fan from '../fan'
import { tilesMap } from '../../utils'

export default class AllGreen extends Fan {
  get name() {
    return '绿一色'
  }

  precondition() {
    return this.isAllInList([
      tilesMap.TWO_BAMBOO, tilesMap.THREE_BAMBOO, tilesMap.FOUR_BAMBOO,
      tilesMap.SIX_BAMBOO, tilesMap.EIGHT_BAMBOO, tilesMap.GREEN_DRAGON
    ])
  }
}
