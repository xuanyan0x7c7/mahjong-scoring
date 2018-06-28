import Fan from "../fan"
import { tilesMap } from "../../utils"

export default class BigThreeDragons extends Fan {
  get name() {
    return '大三元'
  }

  _process() {
    if (!this.isPureNormalHand()) {
      return
    }
    let dragonPungCount = 0
    for (let index = 1; index <= 4; ++index) {
      if (this.melds[index].isPungOrKong() && this.melds[index].tile >= tilesMap.RED_DRAGON) {
        ++dragonPungCount
      }
    }
    if (dragonPungCount === 3) {
      this.fans.push(this.name)
      this.addOmittedFans(['双箭刻', '箭刻'])
    }
  }
}