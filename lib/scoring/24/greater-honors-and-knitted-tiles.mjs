import Fan from "../fan"
import { tilesMap } from '../../utils'

export default class GreaterHonorsAndKnittedTiles extends Fan {
  get name() {
    return '七星不靠'
  }

  _process() {
    if (!this.meld[0].isFullyKnitted()) {
      return
    }
    if (this.melds[0].voids[1] < tilesMap.EAST_WIND) {
      this.fans.push(this.name)
      this.addOmittedFans(['全不靠', '五门齐', '门前清'])
    }
  }
}